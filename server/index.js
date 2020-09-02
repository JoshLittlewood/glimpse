const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let connections = 0;

app.get("*", (req, res) => {
  io.sockets.emit("foo", req.url);
  res.send("done");
});

io.on("connection", (socket) => {
  console.log("New client connected");
  connections++;
  socket.emit("init", `hello connection ${connections}`);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    connections--;
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
