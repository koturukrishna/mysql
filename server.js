const express = require("express");
const mysq = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());

const port = 3005;

const db = mysq.createConnection({
  host: "localhost",
  user: "root",
  password: "krish",
  database: "krish_db",
});

app.get("/course", (req, res) => {
  const sql = " select * from course";
  db.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to my server krishna ");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
