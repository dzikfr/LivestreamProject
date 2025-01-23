const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { apiDataSource } = require("../config/db");
const { Video } = require("../entities/video");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { User } = require("../entities/user");
const { Log } = require("../entities/log");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads/videos");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Not a video file! Please upload only videos."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

router.post("/upload/:id", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const videoUrl = `${baseUrl}/uploads/videos/${req.file.filename}`;
    const videoRepository = apiDataSource.getRepository(Video);

    const newVideo = videoRepository.create({
      video_name: req.file.originalname,
      viewcount: 0,
      playbacklink: videoUrl,
      userId: id,
    });

    const uploadlog = apiDataSource.getRepository(Log).create({
      activity: "Upload Video",
      detail: `User with id: ${id} uploaded a new video with the title: ${req.file.originalname}.`,
    });

    await videoRepository.save(newVideo);
    await apiDataSource.getRepository(Log).save(uploadlog);

    res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    // Delete uploaded file if database operation fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      message: "Error uploading video",
      error: error.message,
    });
  }
});

// Add viewer count
router.post("/view/:id", async (req, res) => {
  const { id } = req.params;

  const result = await apiDataSource.getRepository(Video).findOne({
    where: { id: id },
  });

  if (!result) {
    return res.status(404).json({ message: "Video not found" });
  }

  const viewlog = apiDataSource.getRepository(Log).create({
    activity: "View Video",
    detail: `User with id: ${id} viewed a video uploaded by userId: ${result.userId}.`,
  });
  
  result.viewcount++;
  apiDataSource.getRepository(Video).save(result);
  await videoRepository.save(viewlog);
  res.sendStatus(200);
});

//get all video
router.get("/", async (req, res) => {
  try {
    const result = await apiDataSource.getRepository(Video).find();

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No Videos found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching videos", error: error.message });
  }
});

//get all user video
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await apiDataSource.getRepository(Video).find({
      where: { userId: id },
    });

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No Videos found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching videos", error: error.message });
  }
});

module.exports = router;
