const express = require("express");
const app = express();

const config = require("./config.js");
const db = require("./database/connection.js");

// db.connectDB();

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});

process.on("SIGINT", () => {
  // db.closeDB();
  process.exit(0);
});