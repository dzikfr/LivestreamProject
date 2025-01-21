const express = require("express");
const app = express();
const PORT = 3000;
const userRoute = require("./routes/userRoute");
const streamRoute = require("./routes/streamRoute");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
