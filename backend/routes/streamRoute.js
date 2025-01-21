const express = require("express");
const router = express.Router();
const db = require("../config/db");
const ORYX_APIURL = "http://localhost:2022/api/v1";
const ORYX_EMBEDURL = "http://localhost:2022";

//Get All Stream from oryx
router.get("/", async (req, res) => {
  try {
    const response = await fetch(`${ORYX_APIURL}/streams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer srs-v2-76770cd1996f4846b2986cea8de6539b",
      },
      body: JSON.stringify({
        key: "value",
      }),
    });
    const data = await response.json();
    if (data.streams && data.streams.length > 0) {
      const streamData = data.streams.map((stream) => ({
        streamId: stream.id,
        streamName: stream.name,
        username: stream.name,
        streamUrl: `${ORYX_EMBEDURL}${stream.url}.flv`,
        clients: stream.clients,
      }));

      res.json({
        status: "success",
        totalStreams: streamData.length,
        streams: streamData,
      });
    } else {
      res.json({
        status: "success",
        totalStreams: 0,
        streams: [],
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

//Get user streamlink
router.get("/:id", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
