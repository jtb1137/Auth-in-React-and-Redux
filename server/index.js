const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");

// App Setup
app.use(morgan("combined")); // Middleware - Logging Framework
app.use(bodyParser.json({ type: "*/*" })); // Middleware - Parse Request to JSON
router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
