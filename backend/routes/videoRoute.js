const express = require("express");
const router = express.Router();
const db = require("../config/db");
const ORYX_APIURL = "http://localhost:2022/api/v1";
const ORYX_EMBEDURL = "http://localhost:2022";

//Get All Stream from oryx
router.post("/test", async (req, res) => {
  const { url } = req.body;

  console.log("Recording URL:", url);

  res.sendStatus(200);
});

module.exports = router;
