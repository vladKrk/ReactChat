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


module.exports.server = server;
module.exports.io = io;
module.exports.port = PORT;