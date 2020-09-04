require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const get = require('node-fetch');


const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let connections = 0;

//get rid of this at some point
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// app.get("*", (req, res) => {
//   io.sockets.emit("foo", req.url);
//   res.send("done");
// });


app.all("*", async (req, res) => {
  const startTime = process.hrtime();
  const destination = process.env.DESTINATION;
  
  console.log('***', req.body)
  const result = await get(destination + req.url, {
    headers: {...req.headers},
    body: req.body ? req.body : null,
    method: req.method,
  });
  const resultJson = await result;


  io.sockets.emit(
    "foo",
    {
      url: req.url,
      resTime: Math.floor(process.hrtime(startTime)[1] / 1000000)
    }
  );

  return res.send(resultJson);
});

io.on("connection", (socket) => {
  console.log("New client connected");
  connections++;
  socket.emit("init", `connection ${connections}`);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    connections--;
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));