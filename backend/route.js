const express = require("express");
const attractions = require("./database/connection.js");
const router = express.Router();

router.get("/", async (req, res) => {
  let attractionsData = await attractions.getDocs();
  console.log(attractionsData);
})

module.exports = router;