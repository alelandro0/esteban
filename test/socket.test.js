const chai = require("chai");
const io = require("socket.io-client");

const expect = chai.expect;

const socketURL = "http://localhost:5000"; // Ajusta la URL del servidor Socket.io según tu configuración

describe("Socket.io Server Tests", function () {
  let socket;

  before(function (done) {
    // Conecta al servidor de Socket.io antes de que comiencen las pruebas
    socket = io.connect(socketURL);

    socket.on("connect", function () {
      done();
    });
  });

  after(function (done) {
    // Desconecta el socket después de las pruebas
    socket.disconnect();
    done();
  });

  it("Debería recibir un mensaje de respuesta", function (done) {
    socket.emit("test-event", { data: "Test Data" });

    socket.on("response-event", function (response) {
      expect(response).to.equal("¡Conexión exitosa con el servidor Socket.io!");
      done();
    });
  });

  
});

  
