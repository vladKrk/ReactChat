//-------- Константы -----------//

// ЗАПРОСЫ
const SUCCESS = (mes = "") => {
  return JSON.stringify({ status: "success", data: mes });
};
const ERROR = (mes = "") => {
  return JSON.stringify({ status: "error", data: mes });
};

// ДИАЛОГИ
const Room = require('./models/room.model');

const express = require("express"),
  app = express(),
  server = require("http").createServer(app);

const PORT = process.env.PORT || 3001;

const io = require("socket.io")(server, {
  path: "/",
  serveClient: false,
  cors: {origin: "*"},
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

server.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

const rooms = []
const users = [];

io.on("connection", (client) => {
  console.log("Client connected, id: ", client.id);
  client.on("disconnect", () => {
    console.log("Client disconnected, id: ", client.id);
  });

  client.on("registration", (data, callBack) => {
    const name = data.name;
    if (users.includes(name)) {
      client.join(name);
      callBack(SUCCESS('User entered'));
    } else {
      users.push(name);
      rooms.push(new Room(name, [name], []))
      console.log(rooms, users);
      client.join(name);
      callBack(SUCCESS('User created'));
    }
  });
  client.on('logout', (data, callBack) => {
      const name = data.name;
      for(let room of rooms){
          if(room.hasUser(name)) {
            room.deleteUser(name)
          }
      }
      client.leaveAll();
      callBack(SUCCESS("Sign out succesfully"));
  })

  client.on('fetchRooms', (data, callBack) => {
      const name = data.name
      let currentRooms = [];
      for(let room of rooms) {
          if(room.hasUser(name)) {
            currentRooms.push(room);
          }
      }
      console.log(currentRooms);
      callBack(SUCCESS(currentRooms));
  })

  client.on('fetchRoom', (data, callBack) => {
    const name = data.name,
    roomName = data.roomName;
    let isRoom = false;
    for(let room of rooms) {
        if(room.name === roomName) {
            isRoom = true;
            if(!room.users.includes(name)) {
                room.users.push(name)
                callBack(SUCCESS(room));
                break;
            }
        }
    }
    if(!isRoom) {
        callBack(ERROR('No such room'));
    }
    console.log(rooms);
  })

});
