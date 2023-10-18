const { Server: SocketServer } = require("socket.io");
const http = require("http");
const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

const initializeSocket = require("../socketConfig");

chai.use(chaiHttp);

describe("Socket.io Backend Tests", function () {
  let server, io, socketClient;

  before(function (done) {
    server = http.createServer();
    io = initializeSocket(server);

    server.listen(process.env.SOCKET_PORT,function () {
      const port = server.address().SOCKET_PORT;
      socketClient = io.of("/test-namespace");

      done(); // Llama a done() para indicar que el servidor y el cliente Socket.io están listos
    });
  });

  after(function (done) {
    server.close();
    done();
  });
  it("Should send and receive a message", function (done) {
    const message = "Hello, Socket.io!";
    socketClient.on("connection", (socket) => {
      socket.emit("message", { body: message });
  
      socket.on("message", (data) => {
        expect(data.body).to.equal(message);
        done();
      });
    });
  });
  
  
});
