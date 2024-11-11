const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;
const mysql = require("mysql");

const db = mysql.createConnection({
       host: "localhost",
       user: "Prince",
       password: "Shal@1313",
       database: "ToDoList"
});

// db.query("INSERT INTO tasks (title, description, deadline) VALUES ('Complete Project', 'Finish coding the task manager and add features like a to-do list, task description, and due dates.', '2024-12-31');");

app.use(express.static(path.join(__dirname, 'ProjectFiles')));

app.get("/", (req, res) => {
       res.sendFile(path.join(__dirname, 'ProjectFiles/Layouts', 'index.html'));
});

function returnTaskList(req, res, next) {
       db.query("select * from tasks;", (err, result, fields) => {
              if (err) next(new Error(err.message));

              res.status(200).json(result);
       });
}

app.get("/getTasks", (req, res, next) => {
       returnTaskList(req, res, next);
});

app.use((err, req, res, next) => {
       console.error(err);
       res.status(err.statusCode || 500).send(err.message || "Something unexpected happened");
});

app.listen(PORT, (err) => {
       if (err) throw err;

       console.log("Runnnig on", PORT);
});