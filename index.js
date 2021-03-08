const express = require("express");
// levantar app
const app = express();

// setear puerto
const port = process.env.PORT || 4000;

// public folder
app.use(express.static("public"));

// levantar server
const server = app.listen(port, () => {
  console.log(`server corriendo en el puerto ${port}`);
});

// ====================================

const SocketIO = require("socket.io");
const io = SocketIO(server);

// websockets
io.on("connection", (socket) => {
  console.log("nueva coneccion", socket.id);

  socket.on("chat:message", (data) => {
    io.emit("chat:message", data);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
