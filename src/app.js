import express from "express";
import { pool } from "./db.js"
import { PORT } from "./config.js";

const app = express()

app.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT name, address, telp, age, created_at FROM users WHERE deleted_at IS NULL')
  res.json(rows)
})

app.get('/create', async (req, res) => {
  const result = await pool.query('INSERT INTO users')
})

app.listen(PORT)
console.log('Server on port', PORT)