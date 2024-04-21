const express = require("express");
const attractions = require("./database/connection.js");
const chatGPT = require("./chatGPT.js");
const router = express.Router();

let history = [];
let position = { latitude: 51.134934, longitude: 71.392986 };

router.get("/", async (req, res) => {
  let attractionsData = await attractions.getDocs();
  res.render("index", { history: history, opened: false, attractionsData: attractionsData});
  console.log(attractionsData);
});

router.post("/", async (req, res) => {
  const message = req.body.message;
  const response = await chatGPT.queryChatGPT(message);
  history.push([message, response]);
  res.json({ message: message, response: response });
});

router.post("/location", async (req, res) => {
  position = req.body;
});

router.post("/navigation", async (req, res) => {
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  res.redirect(
    `https://2gis.kz/astana/directions/points/${position.longitude}%2C${position.latitude}%3B9570771978420226%7C${longitude}%2C${latitude}%3B70030076160602854?m=71.278451%2C51.251306%2F10`
  );
});


module.exports = router;
