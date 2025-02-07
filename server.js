const express = require("express");
const mysq = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());

// parse the data

app.use(express.json());

const port = 3005;

const db = mysq.createConnection({
  host: "localhost",
  user: "root",
  password: "krish",
  database: "krish_db",
});

app.get("/", (req, res) => {
  const sql = " select * from emp";
  db.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.get("/emp/:id", (req, res) => {
  const sql = " select * from emp where empId = ?";
  const id = req.params.id;
  db.query(sql, [id], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "update emp set `empName`=?,`place` = ? where empId = ? ";
  const id = req.params.id;

  db.query(sql, [req.body.empName, req.body.place, id], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.delete("/delete/:id", (req, res) => {
  debugger;
  const sql = "delete from emp where empId = ?";
  const id = req.params.id;
  debugger;
  db.query(sql, [id], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.post("/emp", (req, res) => {
  const sql = "insert into emp(`empName`,`place`) values(?)";
  const createUser = [req.body.name, req.body.place];
  db.query(sql, [createUser], (error, data) => {
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
