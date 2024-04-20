const express = require("express");
const app = express();

const homeRoute = require("./route.js");

const config = require("./config.js");
const db = require("./database/connection.js");

db.connect();

app.use("/", homeRoute);

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});

process.on("SIGINT", () => {
  process.exit(0);
});