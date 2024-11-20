import Task from "./task.js";
import Components from "./components.js";
import screenManager from "./screenManager.js";

const taskList = document.querySelector(".taskBody .taskList");

class TaskManager {
       constructor(screenManager, taskList) {
              this.screenManager = screenManager;
              this.tasks = {};
              this.taskList = taskList;

              this.taskList.addEventListener("click", (event) => {
                     let taskObj = Object.values(this.tasks).filter(task => task.elem.querySelector(".checkmark") === event.target.closest(".checkmark"));
                     if (taskObj.length === 1) {
                            taskObj[0].toggle();
                            return;
                     }

                     taskObj = Object.values(this.tasks).filter(task => task.elem.querySelector(".deleteButton") === event.target.closest(".deleteButton"));
                     if (taskObj.length === 1) {
                            taskObj[0].delete();
                            return;
                     }

                     taskObj = Object.values(this.tasks).filter(task => task.elem.querySelector(".taskInfo") === event.target.closest(".taskInfo"));
                     if (taskObj.length === 1) {
                            this.openTaskDetails(taskObj[0]);
                     }
              });
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
                     const currentTaskIDs = new Set(Object.keys(this.tasks));
                     const newTaskIDs = new Set(data.map(taskData => taskData.id));

                     for (let id of currentTaskIDs) {
                            if (!newTaskIDs.has(+id)) {
                                   this.tasks[id].elem.remove();
                                   delete this.tasks[id];
                            }
                     }

                     for (let taskData of data) {
                            const taskObj = new Task(Components.createTask(taskData), taskData, this);
                            if (!this.tasks[taskObj.id]) {
                                   this.tasks[taskObj.id] = taskObj;
                                   this.taskList.appendChild(taskObj.elem);       
                            }
                     }
       
                     if (this.screenManager.activeScreen.name !== "taskList") this.screenManager.changeTo("taskList");
              })
              .catch(err => {console.error(err)});
       }


       openTaskDetails(task) {
              const taskTitle = document.querySelector(".taskDetails .taskTitle .text");
              const taskDesc = document.querySelector(".taskDetails .taskDesc .text");
              const taskDealine = document.querySelector(".taskDetails .deadline .text");

              document.querySelector(".create").classList.add("hidden");
              document.querySelector(".closeTask").classList.add("active");

              taskTitle.textContent = task.taskData.title;
              taskDesc.textContent = task.taskData.description;
              taskDealine.textContent = task.taskData.deadline;

              this.screenManager.changeTo("taskDetails");
       }
}

const taskManager = new TaskManager(screenManager, taskList);

export default taskManager;