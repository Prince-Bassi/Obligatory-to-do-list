const http = require("http");
const url = require("url");
const fs = require("fs");
const mysql = require("mysql");

const db = mysql.createConnection({
       host: "localhost",
       user: "Prince",
       password: "Shal@1313",
       database: "ToDoList"
});

// db.query("INSERT INTO tasks (title, description, deadline) VALUES ('Complete Project', 'Finish coding the task manager and add features like a to-do list, task description, and due dates.', '2024-12-31');");

function throwError(err, statusCode, res, resType) {
       let message = err.message;
       if (resType === "application/json") {
              message = JSON.stringify(message);
       }

       res.writeHead(statusCode, {"Content-Type": resType});
       res.write(err.message);
       return res.end();
}

function serveFile(filePath, fileType, res) {
       fs.readFile(filePath, (err, data) => {
              if (err) return throwError(Error(`Failed to read file '${filePath}'`), 404, res, "text/html");

              res.writeHead(200, {"Content-Type": fileType});
              res.write(data);
              return res.end();    
       });
}

function returnTaskList(res) {
       db.query("select * from tasks;", (err, result, fields) => {
              if (err) return throwError(err, 500, res, "application/json");

              res.writeHead(200, {"Content-Type": "application/json"});
              res.write(JSON.stringify(result));
              return res.end();
       });
}

http.createServer((req, res) => {
       const parsedURL = url.parse(req.url, true);
       const pathName = parsedURL.pathname;

       switch (pathName) {
              case "/":
                     serveFile("index.html", "text/html", res);
                     break;
              case "/emptyIcon.svg":
                     serveFile("emptyIcon.svg", "image/svg+xml", res);
                     break;
              case "/style.css":
                     serveFile("style.css", "text/css", res);
                     break;
              case "/script.js":
                     serveFile("script.js", "application/javascript", res);
                     break;
              case "/components":
                     serveFile("components.js", "application/javascript", res);
                     break;
              case "/getTasks":
                     returnTaskList(res);
                     break;
              default:
                     throwError(Error("Route not found"), 404, res, "text/html");
       }

}).listen(8080);