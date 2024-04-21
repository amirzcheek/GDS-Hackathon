const express = require("express");
const attractions = require("./database/connection.js");
const chatGPT = require("./chatGPT.js");
const router = express.Router();

let history = [];

router.get("/", async (req, res) => {
  // let attractionsData = await attractions.getDocs();
  res.render("index", { history: history, opened: false });
});

router.post("/", async (req, res) => {
  const message = req.body.message;
  const response = await chatGPT.queryChatGPT(message);
  history.push([message, response]);
  res.json({ message: message, response: response });
});

router.post('/location', (req, res) => {
  console.log(req.body); // { latitude: ..., longitude: ... }
  res.json({ status: 'Location data received successfully' });
});

module.exports = router;
