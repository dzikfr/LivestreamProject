const express = require("express");
const router = express.Router();
const ORYX_APIURL = "http://localhost:2022/api/v1";
const ORYX_EMBEDURL = "http://localhost:2022";
const { apiDataSource } = require("../config/db");
const { User } = require("../entities/user");
const { Streamkey } = require("../entities/streamkey");

//Get All Stream from oryx
router.get("/", async (req, res) => {
  try {
    const response = await fetch(`${ORYX_APIURL}/streams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer srs-v2-7ff6f3ad25bb4808a032d36dd4e81683",
      },
      body: JSON.stringify({
        key: "value",
      }),
    });
    const data = await response.json();
    if (data.streams && data.streams.length > 0) {
      const streamData = data.streams.map(async (stream) => {
        const user = await apiDataSource.getRepository(User).findOne({
          where: { username: stream.name },
        });

        return {
          userId: user?.id,
          streamId: stream.id,
          streamName: stream.name,
          username: stream.app.split("/")[1],
          streamUrl: `${ORYX_EMBEDURL}${stream.url}.m3u8`,
          clients: stream.clients,
        };
      });

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

//Get user livestream link
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const validation = await apiDataSource.getRepository(Streamkey).findOne({
      where: { userId: id },
    });

    if (validation) {
      const result = await apiDataSource.getRepository(User).findOne({
        where: { id: id },
      });
      res.status(200).json({
        streamUrl: `${ORYX_EMBEDURL}/live/${result.username}/${validation.key.split("?")[0]}.m3u8`,
      });
    }
    return res
      .status(404)
      .json({ message: "User never / havent started streaming!" });
  } catch (error) {
    console.error("Error:", error);
  }
});

module.exports = router;
