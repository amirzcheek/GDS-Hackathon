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
});

router.get('/location', (req, res) => {
  window.open('https://2gis.kz/astana/directions/points/71.426677%2C51.096833%3B9570771978420226%7C71.426677%2C52.096833%3B70030076160602854?m=71.278451%2C51.251306%2F10', '_blank');
});

module.exports = router;
