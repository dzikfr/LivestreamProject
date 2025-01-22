const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { apiDataSource } = require("../config/db");
const { User } = require("../entities/user");
const dotenv = require("dotenv");
const path = require("path");
const { Log } = require("../entities/log");

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
    const result = await apiDataSource.getRepository(User).delete({
      id: id,
    });
    res.json(result.rows).status(200);
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

module.exports = router;
