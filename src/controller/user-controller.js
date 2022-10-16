import { pool } from "../db.js"

pool.on("error", (err) => {
  console.error(err);
});

const getCurrentDate = () => {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  return (
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
}

export const getUsers = async (req, res) => {
  const [rows] = await pool.query(
    "SELECT name, address, telp, age, created_at FROM users WHERE deleted_at IS NULL"
  );
  res.json({
    success: true,
    message: "Success",
    data: rows,
  });
}

export const getUserByID = async (req, res) => {
  let id = req.params.id;
  const [rows] = await pool.query(
    `SELECT name, address, telp, age, created_at FROM users WHERE deleted_at IS NULL AND id = ?`,
    [id]
  );
  res.json({
    success: true,
    message: "Success",
    data: rows[0] ? rows[0] : rows,
  });
}
  
export const addUser = async (req, res) => {
  const currentDate = getCurrentDate()
  let data = {
    name: req.body.name,
    address: req.body.address,
    telp: req.body.telp,
    age: req.body.age,
    created_at: currentDate,
  };
  const [result] = await pool.query(
    `INSERT INTO users SET ?`,
    [data]
  );
  res.json({
    success: true,
    message: "Data Created",
    data: result
  });
}

export const updateUser = async (req, res) => {
  let data = {
    name: req.body.name,
    address: req.body.address,
    telp: req.body.telp,
    age: req.body.age,
  };
  let id = req.body.id;
  const [result] = await pool.query(
    `UPDATE users SET ? WHERE id = ?`,
    [data, id],
  );
  res.json({
    success: true,
    message: "Data Updated",
    data: result
  });
}

export const deleteUser = async (req, res) => {
  const currentDate = getCurrentDate()
  let dataUpdate = {
    deleted_at: currentDate,
  };
  let id = req.params.id;
  const [result] = await pool.query(
    `UPDATE users SET ? WHERE id = ?`,
    [dataUpdate, id],
  );
  res.json({
    success: true,
    message: "Data Deleted",
    data: result
  });
}
