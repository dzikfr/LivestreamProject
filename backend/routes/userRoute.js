const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { apiDataSource } = require("../config/db");
const { User } = require("../entities/user");
const dotenv = require("dotenv");
const path = require("path");
const { Log } = require("../entities/log");
const { Streamkey } = require("../entities/streamkey");
const { Stream } = require("stream");

dotenv.config({ path: path.join(__dirname, "../.env") });

//Get All Users
router.get("/", async (req, res) => {
  try {
    const result = await apiDataSource.getRepository(User).find();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get user by ID/param
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await apiDataSource.getRepository(User).findOne({
      where: { id: id },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = apiDataSource.getRepository(User).create({
      username: username,
      password: password,
    });

    const result = await apiDataSource.getRepository(User).save(newUser);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Update user by ID/param
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    //check if user exist
    const userExist = await apiDataSource.getRepository(User).findOne({
      where: { id: id },
    });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password && (await bcrypt.compare(password, userExist.password))) {
      return res
        .status(400)
        .json({ error: "New password cannot be the same as the old password" });
    }

    // Enkcrypt
    let newPassword = userExist.password;
    if (password) {
      newPassword = await bcrypt.hash(password, 10);
    }

    // Update user
    const updatedUser = apiDataSource.getRepository(User).merge(userExist, {
      username: username || userExist.username, // Tetap gunakan username lama jika tidak ada perubahan
      password: newPassword, // Gunakan password terenkripsi
    });

    const result = await apiDataSource.getRepository(User).save(updatedUser);

    delete result.password;

    res
      .status(200)
      .json({ data: result, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete User
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    await apiDataSource.getRepository(Streamkey).delete({
      userId: numericId,
    });

    const result = await apiDataSource.getRepository(User).delete({
      id: numericId,
    });

    if (result.affected === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    const loginlog = apiDataSource.getRepository(Log).create({
      activity: "Delete user",
      detail: `User with id: ${id} has been deleted by dev.`,
      username: "dev",
    });

    await apiDataSource.getRepository(Log).save(loginlog);

    res.status(200).json({
      message: `User with ID ${numericId} has been deleted successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await apiDataSource.getRepository(User).findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Match password
    const match = bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    delete user.password;

    const loginlog = apiDataSource.getRepository(Log).create({
      activity: "User Logged in",
      detail: `user with username: ${username}, has logged in, id: ${result.id}`,
      username: username,
    });

    await apiDataSource.getRepository(Log).save(registerlog);

    res.status(200).json({ data: user, message: "Login success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkDuplicate = await apiDataSource.getRepository(User).findOne({
      where: {
        username: username,
      },
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
      detail: `user with username: ${username}, has create an account, id: ${result.id}`,
      username: username,
    });

    await apiDataSource.getRepository(Log).save(registerlog);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await apiDataSource.getRepository(User).findOne({
      where: { username: username },
    });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/key/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const validation = wait apiDataSource.getRepository(Streamkey).findOne({
      where: { userId: id },
    });

    if(validation){
      res.json(validation.key);
    }

    const result = await apiDataSource.getRepository(Streamkey).findOne({
      where: { userId: null },
    });

    if (!result) {
      return res.status(404).json({ message: "No streamkey available!" });
    }

    result.userId = id;
    await apiDataSource.getRepository(Streamkey).save(result);
    res.json(result.key);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/key/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await apiDataSource.getRepository(Streamkey).findOne({
      where: { userId: id },
    });

    if (!result) {
      return res.status(404).json({ message: "No streamkey reserved!" });
    }

    result.userId = null;
    await apiDataSource.getRepository(Streamkey).save(result);
    res.status(200).json({ message: "Key unreserved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
