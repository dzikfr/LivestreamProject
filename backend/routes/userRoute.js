const express = require("express");
const router = express.Router();
const db = require("../config/db");

//Get All Users
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get user by ID/param
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const result = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );

    res.status(201).json(result.rows[0]);
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

    const userQuery = await db.query(
      "SELECT password FROM users WHERE user_id = $1",
      [id]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const oldPassword = userQuery.rows[0].password;

    if (oldPassword === password) {
      return res
        .status(400)
        .json({ error: "New password cannot be the same as the old password" });
    }

    const result = await db.query(
      "UPDATE users SET username = $1, password = $2 WHERE user_id = $3 RETURNING *",
      [username, password, id]
    );

    res.status(200).json(result.rows[0]); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM users WHERE user_id = $1", [id]);
    res.json(result.rows).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await db.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = result.rows[0];
    res.status(200).json({data: user, message: "Login success", status : 200});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;