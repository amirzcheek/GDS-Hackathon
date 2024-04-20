const express = require("express");
const attractions = require("./database/connection.js");
const chatGPT = require('./chatGPT.js');
const router = express.Router();

router.get("/", async (req, res) => {
  let attractionsData = await attractions.getDocs();
  console.log(await chatGPT.queryChatGPT("Hello!"));
  res.render("index");
})

router.post("/", async (req, res) => {
  
})

module.exports = router;