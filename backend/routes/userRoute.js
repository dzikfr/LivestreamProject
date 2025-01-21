const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { apiDataSource } = require("../config/db");
const { User } = require("../entities/user");

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

    const userExist = await apiDataSource.getRepository(User).findOne({
      where: { id: id },
    });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const oldPassword = userExist.password;

    if (oldPassword === password) {
      return res
        .status(400)
        .json({ error: "New password cannot be the same as the old password" });
    }

    const updatedUser = apiDataSource.getRepository(User).create({
      username: username,
      password: password,
    });

    const result = await apiDataSource.getRepository(User).save(updatedUser);
    res.status(200).json(result);
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

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await apiDataSource.getRepository(User).findOne({
      where: {
        username: username,
      },
    });

    if (!result) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const match = bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = result;
    res.status(200).json({ data: user, message: "Login success", status: 200 });
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
    });

    const result = await apiDataSource.getRepository(User).save(newUser);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
