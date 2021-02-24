//-------- Константы -----------//

// ЗАПРОСЫ
const SUCCESS = (mes = "") => {
  return JSON.stringify({ status: "success", data: mes });
};
const ERROR = (mes = "") => {
  return JSON.stringify({ status: "error", data: mes });
};
//

const Room = require("./models/room.model");
const Message = require("./models/message.model");

const { server, io, port } = require("./configs/server.config");

server.listen(port, () => {
  console.log("Listening on port: ", port);
});

const rooms = [];
const users = [];
const connectedUsers = [];

io.on("connection", (client) => {
  console.log("Client connected, id: ", client.id);

  const otherUsers = connectedUsers.filter(user => user.id !== client.id);
  client.emit('other-users', otherUsers.map(user => user.name));

  client.on("disconnect", () => {
    console.log("Client disconnected, id: ", client.id);
    connectedUsers.forEach((user, index) => {
      if (user.id === client.id) {
        connectedUsers.splice(index, 1);
      }
    });
    io.emit("activeUsersSubscribe", {
      activeUsers: connectedUsers.map((user) => user.name),
    });
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

  client.on("logout", (data) => {
    const name = data.name;
    connectedUsers.forEach((user, index) => {
      if (user.name === name) {
        connectedUsers.splice(index, 1);
      }
    });
    io.emit("activeUsersSubscribe", {
      activeUsers: connectedUsers.map((user) => user.name),
    });
  });

  //Проверяем есть ли пользователь онлайн
  client.on("checkingUser", (data) => {
    connectedUsers.push({ name: data.name, id: client.id });
    io.emit("activeUsersSubscribe", {
      activeUsers: connectedUsers.map((user) => user.name),
    });
  });

  //Приносим комнаты только конкретного пользователя
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
        client.join(room.name);
        if (!room.users.includes(name)) {
          room.users.push(name);
          client.broadcast
            .to(roomName)
            .emit("membersSubscribe", { name, roomName });
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

  client.on("fetchActiveUsers", (callBack) => {
    callBack(SUCCESS(connectedUsers.map((user) => user.name)));
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

  client.on('offer', (socketName, description) => {
    const socketId = (connectedUsers.find((user) => user.name === socketName)).id;
    client.to(socketId).emit('offer', client.id, description);
  });

  client.on('answer', (socketName, description) => {
    const socketId = connectedUsers.find((user) => user.name === socketName).id;
    client.to(socketId).emit('answer', description);
  });

  client.on('candidate', (socketName, signal) => {
    const socketId = connectedUsers.find((user) => user.name === socketName).id;
    client.to(socketId).emit('candidate', signal);
  });

});
