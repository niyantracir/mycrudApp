const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db");
require("dotenv").config();

const app = express();



app.use(cors());
app.use(express.json());

/**
 * CREATE TODO
 */

app.use(express.static(path.join(__dirname, "public")));


app.post("/todos", async (req, res) => {
  try {
    const { title } = req.body;

    const result = await pool.query(
      "INSERT INTO todos(title) VALUES($1) RETURNING *",
      [title]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET ALL TODOS
 */
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM todos ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET SINGLE TODO
 */
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM todos WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * UPDATE TODO
 */
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const result = await pool.query(
      `UPDATE todos
       SET title = $1,
           completed = $2
       WHERE id = $3
       RETURNING *`,
      [title, completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * DELETE TODO
 */
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({
      message: "Todo deleted",
      todo: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});