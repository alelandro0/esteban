const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const morgan = require("morgan");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { resolve, dirname } = require("path");
const authenticate = require("./auth/authenticate.js");
const initializeSocket = require("./socketConfig.js");

require("dotenv").config();

const expressPort = process.env.PORT || 5000;


// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static(resolve(__dirname, "front", "dist")));

// Generate random token secrets
const generateTokenSecret = () => {
    return crypto.randomBytes(64).toString("hex");
};

const ACCESS_TOKEN_SECRET = generateTokenSecret();
const REFRESH_TOKEN_SECRET = generateTokenSecret();

// Store token secrets in environment variables
process.env.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
process.env.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;

// Initializations
const server = http.createServer(app);
const io = initializeSocket(server);

async function main() {
    try {
        await mongoose.connect(process.env.BD_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB :D");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

main();

// Routes
app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/user", authenticate, require("./routes/user"));
app.use("/api/signout", require("./routes/signout"));
app.use("/api/todos", authenticate, require("./routes/todos"));
app.use("/api/refresh-token", require("./routes/refreshToken"));

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

server.listen(expressPort, () => {
    console.log(`Express Server is running on port: ${expressPort}`);
});
