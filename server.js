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

app.patch("/updateTask", (req, res, next) => {
       const tasksToUpdate = req.body;

       if (tasksToUpdate) {
              const promiseArr = Object.entries(tasksToUpdate).map(([taskId, taskData]) => {
                     const params = Object.keys(taskData).map(field => `${field} = ?`).join(",");
                     const query = `UPDATE tasks SET ${params} WHERE id = ?;`;

                     return new Promise((resolve, reject) => {
                            db.query(query, [...Object.values(taskData), taskId], (err, result) => {
                                   if (err) reject(err);
                                   resolve(taskId);
                            });
                     });
              });
              

              Promise.allSettled(promiseArr)
              .then((results) => {
                     const resolved = results.map(result => {if (result.status === "fulfilled") return result.value});
                     const rejected = results.map(result => {if (result.status === "rejected") return result.value});

                     res.status(200).send(`Tasks ${resolved.join(", ") || "not"} Updated\nTasks ${rejected.join(",") || "not"} failed`);
              })
              .catch(err => next(err));
       }
       else {
              next(new Error("No tasks provided"));
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