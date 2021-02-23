//-------- Константы -----------//

// ЗАПРОСЫ
const SUCCESS = (mes = "") => {
  return JSON.stringify({ status: "success", data: mes });
};
const ERROR = (mes = "") => {
  return JSON.stringify({ status: "error", data: mes });
};

// ДИАЛОГИ
const Room = require("./models/room.model");
const Message = require('./models/message.model');

const express = require("express"),
  app = express(),
  server = require("http").createServer(app);

const PORT = process.env.PORT || 3001;

const io = require("socket.io")(server, {
  path: "/",
  serveClient: false,
  cors: { origin: "*" },
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

server.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

const rooms = [];
const users = [];

io.on("connection", (client) => {
  console.log("Client connected, id: ", client.id);
  client.on("disconnect", () => {
    console.log("Client disconnected, id: ", client.id);
  });

  client.on("registration", (data, callBack) => {
    const name = data.name;
    if (users.includes(name)) {
      callBack(SUCCESS("User entered"));
    } else {
      users.push(name);
      rooms.push(new Room(name, [name], []));
      callBack(SUCCESS("User created"));
    }
  });

  client.on("fetchRooms", (data, callBack) => {
    const name = data.name;
    let currentRooms = [];
    for (let room of rooms) {
      if (room.hasUser(name)) {
        currentRooms.push(room);
      }
    }
    callBack(SUCCESS(currentRooms));
  });

  client.on("fetchRoom", (data, callBack) => {
    const name = data.name,
      roomName = data.roomName;
    let isRoom = false;
    for (let room of rooms) {
      if (room.name === roomName) {
        isRoom = true;
        client.leaveAll();
        client.join(room.name) 
        if (!room.users.includes(name)) {
          room.users.push(name);
          client.broadcast.to(roomName).emit("membersSubscribe", {name, roomName});
          callBack(SUCCESS(room));
        } else {
          callBack(ERROR("This user has such room"));
        }
      }
    }
    if (!isRoom) {
      callBack(ERROR("No such room"));
    }
  });

  client.on("sendMessage", (data, callBack) => {
    const sender = data.sender,
      roomName = data.roomName,
      text = data.text;
    const date = new Date(Date.now()).toTimeString().slice(0, 5);
    const newMessage = new Message(text, date, sender);
    for (let room of rooms) {
      if (room.name === roomName) {
        room.messages.push(newMessage);
        break;
      }
    }
    client.broadcast.to(roomName).emit("message", newMessage);
    callBack(SUCCESS("Message was sent"));
  });
});
