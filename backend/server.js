const express = require("express");
const app = express();
const PORT = 3000;
const userRoute = require("./routes/userRoute");
const streamRoute = require("./routes/streamRoute");
const videoRoute = require("./routes/videoRoute");
const authRoute = require("./routes/authRoute");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { apiDataSource } = require("./config/db");
// const { Video } = require("./entities/video");
// const { User } = require("./entities/user");
// const Docker = require("dockerode");
// const docker = new Docker();

async function intializeAPI() {
  try {
    await apiDataSource.initialize();
    console.log("Database Initialized");
    app.use(morgan("dev"));
    app.use(
      rateLimit({
        windowMs: 60 * 60 * 1000,
        max: 100,
        message: "You have exceeded the 100 requests in 1 hour limit!",
        standarHeaders: true,
        legacyHeaders: true,
      }),
    );

    app.use(cors());

    app.use(express.json());
    app.use("/uploads", express.static("uploads"));
    app.use("/user", userRoute);
    app.use("/stream", streamRoute);
    app.use("/dvr", videoRoute);
    app.use("/auth", authRoute);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// async function monitorDockerLogs() {
//   try {
//     await apiDataSource.initialize();
//     const container = docker.getContainer(
//       "bc07cb697fd6a09b97de134bd2c1dfc25234311f0b4e3f90b501a75c069b0da7",
//     );
//     const logStream = await container.logs({
//       follow: true,
//       stdout: true,
//       stderr: true,
//       timestamps: true,
//       since: Math.floor(Date.now() / 1000),
//       tail: 0,
//     });
// async function monitorDockerLogs() {
//   try {
//     await apiDataSource.initialize();
//     const container = docker.getContainer(
//       "bc07cb697fd6a09b97de134bd2c1dfc25234311f0b4e3f90b501a75c069b0da7",
//     );
//     const logStream = await container.logs({
//       follow: true,
//       stdout: true,
//       stderr: true,
//       timestamps: true,
//       since: Math.floor(Date.now() / 1000),
//       tail: 0,
//     });

//     logStream.on("data", async (data) => {
//       const logLine = data.toString("utf8");

//       // Check for record ID in "Record is done" logs
//       if (logLine.includes("Record is done")) {
//         const urlMatch = logLine.match(/url=([^,]+)/);
//         const uuidMatch = logLine.match(/uuid=([^,]+)/);

//         if (urlMatch && uuidMatch) {
//           const url = urlMatch[1];
//           const uuid = uuidMatch[1].trim();
//           const username = url.split("/")[1];
//           const result = await apiDataSource.getRepository(User).findOne({
//             where: { username: username },
//           });

//           if (result) {
//             const newVideo = apiDataSource.getRepository(Video).create({
//               video_name: uuid,
//               userId: result.id,
//               playbacklink: `http://localhost:2022/terraform/v1/hooks/record/hls/${uuid}/index.mp4`,
//               viewcount: 0,
//             });

//             await apiDataSource.getRepository(Video).save(newVideo);
//           }

//           console.log(`New recording detected:`, {
//             id: uuid,
//             url: `http://localhost:2022/terraform/v1/hooks/record/hls/${uuid}/index.mp4`,
//           });
//         }
//       }
//     });
//   } catch (error) {
//     console.error("Error monitoring docker logs:", error);
//     setTimeout(monitorDockerLogs, 5000);
//   }
// }

intializeAPI();
//monitorDockerLogs();
