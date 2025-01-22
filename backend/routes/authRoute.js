const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { apiDataSource } = require("../config/db");
const { User } = require("../entities/user");
const { Log } = require("../entities/log");
const dotenv = require("dotenv");

dotenv.config();

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await apiDataSource.getRepository(User).findOne({
      where: { username: username },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Match password
    const match = bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h", // Token valid for 1 hour
      },
    );

    // Log user login
    const loginlog = apiDataSource.getRepository(Log).create({
      activity: "User Logged in",
      detail: `User with username: ${username}, has logged in, id: ${user.id}, token: ${token}`,
      username: username,
    });

    await apiDataSource.getRepository(Log).save(loginlog);

    delete user.password;

    res.status(200).json({
      data: { ...user, token },
      message: "Login success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkDuplicate = await apiDataSource.getRepository(User).findOne({
      where: { username: username },
    });

    if (checkDuplicate) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = apiDataSource.getRepository(User).create({
      username: username,
      password: hashedPassword,
      streamlink: `rtmp://localhost/live/${username}`,
    });

    const result = await apiDataSource.getRepository(User).save(newUser);

    const registerlog = apiDataSource.getRepository(Log).create({
      activity: "New User Created",
      detail: `User with username: ${username}, has created an account, id: ${result.id}`,
      username: username,
    });

    await apiDataSource.getRepository(Log).save(registerlog);

    delete result.password;

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
