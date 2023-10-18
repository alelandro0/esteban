const { Server: SocketServer } = require("socket.io");

function initializeSocket(server) {
  const io = new SocketServer(server, {
    // Configuración adicional si es necesaria
  });

  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("test-event", (data) => {
      console.log("Received event:", data);
      socket.emit("response-event", "Successful connection to Socket.io server!");
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected: " + socket.id);
    });
  });

  return io;
}

module.exports = initializeSocket;
