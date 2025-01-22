const express = require("express");
const router = express.Router();
const db = require("../config/db");
const ORYX_APIURL = "http://localhost:2022/api/v1";
const ORYX_EMBEDURL = "http://localhost:2022";
const { apiDataSource } = require("../config/db");
const { Video } = require("../entities/video");

// Add viewer count
router.post("/view/:id", async (req, res) => {
  const { id } = req.params;

  const result = await apiDataSource.getRepository(Video).findOne({
    where: { id: id },
  });

  if (!result) {
    return res.status(404).json({ message: "Video not found" });
  }
  result.viewcount++;
  apiDataSource.getRepository(Video).save(result);
  res.sendStatus(200);
});

module.exports = router;
