const express = require("express");
const router = express.Router();
const { apiDataSource } = require("../config/db");
const { Log } = require("../entities/log");

router.get("/", async (req, res) => {
    try {
      const result = await apiDataSource.getRepository(Log).find();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router