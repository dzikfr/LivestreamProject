const express = require("express");
const app = express();
const PORT = 3000;
const userRoute = require("./routes/userRoute");
const streamRoute = require("./routes/streamRoute");
const videoRoute = require("./routes/videoRoute");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { apiDataSource } = require("./config/db");

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
    app.use("/user", userRoute);
    app.use("/stream", streamRoute);
    app.use("/dvr", videoRoute);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

intializeAPI();
