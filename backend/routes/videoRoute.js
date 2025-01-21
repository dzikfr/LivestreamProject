const express = require("express");
const router = express.Router();
const db = require("../config/db");
const ORYX_APIURL = "http://localhost:2022/api/v1";
const ORYX_EMBEDURL = "http://localhost:2022";

//Get All Stream from oryx
router.post("/", async (req, res) => {
  try {
    const {
      action, // DVR action
      file, // DVR file path
      app, // Application name
      stream, // Stream name
    } = req.body;

    if (action === "dvr") {
      console.log("Recording completed. File path:", file);

      //construct the URL
      const publicUrl = `${ORYX_EMBEDURL}/${app}/${stream}.flv`;

      console.log("Public URL:", publicUrl);

      // You could store this information in a database if needed

      res.status(200).json({
        success: true,
        filePath: file,
        publicUrl: publicUrl,
      });
    }
  } catch (error) {
    console.error("Error processing DVR callback:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
