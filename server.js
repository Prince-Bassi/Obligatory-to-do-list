require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;
const mysql = require("mysql");

const db = mysql.createConnection({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME
});

app.use(express.static(path.join(__dirname, 'ProjectFiles')));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get("/", (req, res) => {
       res.sendFile(path.join(__dirname, 'ProjectFiles/Layouts', 'index.html'));
});

app.get("/getTasks", (req, res, next) => {
       db.query("select * from tasks;", (err, result) => {
              if (err) next(err);
              
              res.status(200).json(result);
       });
});

app.post("/addTask", (req, res, next) => {
       const taskData = req.body;

       if (taskData.title && taskData.desc && taskData.deadline) {
              db.query(`INSERT INTO tasks (title, description, deadline) VALUES (?, ?, ?);`, [taskData.title, taskData.desc, taskData.deadline], (err, result) => {
                     if (err) next(err)
                     
                     res.status(200).send("Task created");
              });
       }
       else {
              next(new Error("Incomplete data received"));
       }
});

app.delete("/deleteTask", (req, res, next) => {
       const taskId = req.body.id;

       if (taskId) {
              db.query("DELETE FROM tasks WHERE id = ?;", [taskId], (err, result) => {
                     if (err) next(err);

                     res.status(200).send(`Task ${taskId} Deleted`);
              });
       }
       else {
              next(new Error("Null ID Found"));
       }
});

app.use((err, req, res, next) => {
       console.error(err);
       res.status(err.statusCode || 500).send(err.message || "Something unexpected happened");
});

app.listen(PORT, (err) => {
       if (err) throw err;

       console.log("Runnnig on", PORT);
});