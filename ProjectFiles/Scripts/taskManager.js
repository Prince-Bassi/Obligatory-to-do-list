import Task from "./task.js";
import Components from "./components.js";

class TaskManager {
       constructor(screenManager, taskList) {
              this.screenManager = screenManager;
              this.tasks = [];
              this.taskList = taskList;

              this.taskList.addEventListener("click", (event) => {
                     const taskObj = this.tasks.filter(task => task.elem.querySelector(".taskInfo") === event.target.closest(".taskInfo"));
                     if (taskObj.length === 1) {
                            this.openTaskDetails(taskObj[0]);
                            createButton.classList.add("hidden");
                            closeTaskButton.classList.add("active");
                     }
              });
              this.displayTasks();

              document.addEventListener("keypress", (event) => {
                     if (event.key == "k") {
                            this.fadeTaskList(this.taskList, 300, "in");
                     }
                     if (event.key === "p") {
                            this.taskList.style.opacity = 0;
                     }
              });
       }

       clearTasks() {
              const tasks = this.taskList.querySelectorAll(".tasks");
              tasks.forEach(task => task.remove());
       }

       displayTasks() {
              fetch("/getTasks", {
                     method: "GET"
              })
              .then(response => response.json())
              .then (data => {
                     if (!data.length) {
                            this.screenManager.changeTo("emptyList");
                            return;
                     }

                     this.screenManager.changeTo("taskList");
                     for (let taskData of data) {
                            const taskObj = new Task(Components.createTask(taskData), taskData, this);
                            this.tasks.push(taskObj);
                     }
                     
                     for (let taskObj of this.tasks) {
                            this.taskList.appendChild(taskObj.elem);
                     }

                     this.fadeTaskList(this.taskList, 300, "in");
                     setTimeout(() => {
                            this.fadeTaskList(this.taskList, 300, "out");
                     }, 300);
              })
              .catch(err => {console.error(err)});
       }

       fadeTaskList(taskList, duration, mode) {
              if (mode === "in") {
                     taskList.style.opacity = 0;
              }
              else if (mode === "out") {
                     taskList.style.opacity = 1;
              }

              let startTime = 0;
              function animate(time) {
                     if (!startTime) startTime = time;
                     const passedTime = time - startTime;

                     let progress;
                     if (mode === "in") progress = passedTime / duration;
                     else if (mode === "out") progress = 1 - (passedTime / duration);
                     
                     taskList.style.opacity = progress;
                     console.log(progress);

                     if ((mode === "in" && progress < 1) || (mode === "out" && progress > 0)) {
                            requestAnimationFrame(animate);
                     }
              }

              requestAnimationFrame(animate)
       }

       openTaskDetails(task) {
              this.screenManager.changeTo("taskDetails");
       }
}

export default TaskManager;