const { Server: SocketServer } = require("socket.io");
const express= require('express')
const app =express()

function initializeSocket(server) {
  const io = new SocketServer(server, {
    // Configuración adicional si es necesaria
  });
  app.get("/", (req, res) => {
    res.send("Chat IO");
});

  io.on("connection", (socket) => {
    console.log("Usuario conectado: " + socket.id);
    

    socket.on("test-event", (data) => {
        console.log("Evento recibido:", data);
        socket.emit("response-event", "¡Conexión exitosa con el servidor Socket.io!");
    });
});

  return io;
}

module.exports = initializeSocket;
