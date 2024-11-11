import Components from "./components.js";

const taskList = document.querySelector(".taskBody .taskList");
const createButton = document.querySelector("header .create");
const closeTaskButton = document.querySelector("header .closeTask");
const emptyList = document.querySelector(".taskBody .empty");
const checkmarks = document.querySelectorAll(".taskBody .taskList .task .checkmark");
const taskInfo = document.querySelectorAll(".taskBody .taskList .task .taskInfo");
const taskDetails = document.querySelector(".taskBody .taskDetails");
const screens = {"taskList": taskList, "emptyList": emptyList, "taskDetails": taskDetails};

class Screen {
       constructor(screenManager, screenElem, name) {
              this.screenManager = screenManager;
              this.screenElem = screenElem;
              this.name = name;
       }

       display() {
              this.screenElem.classList.add("active");
       }

       hide() {
              this.screenElem.classList.remove("active");
       }
}

class ScreenManager {
       constructor(screens) {
              const screenObjKeys = Object.keys(screens);
              this.screens = {};

              for (let i of screenObjKeys) {
                     this.screens[i] = new Screen(this, screens[i], i);
              }

              this.activeScreen = this.screens["taskList"];
              this.previousScreen;

              this.activeScreen.display();
       }

       changeTo(screen) {
              const screenObj = this.screens[screen];
              if (screen === this.activeScreen) {
                     return;
              }

              this.activeScreen.hide();
              screenObj.display();

              this.previousScreen = this.activeScreen;
              this.activeScreen = screenObj;
       }
}

class Task {
       constructor(elem, taskData, taskManager) {
              this.initialTaskData = taskData;
              this.taskData = taskData;

              this.taskManager = taskManager;
              this.elem = elem;
       }

       toggle() {
              if (this.completed) {
                     this.taskData.completed = false;
                     this.elem.classList.remove("check");
              }
              else {
                     this.taskData.completed = true;
                     this.elem.classList.add("check");
              }
       }
}

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

function taskToggle(task) {
       task.classList.toggle("check");
}

checkmarks.forEach(elem => {
       elem.addEventListener("click", () => {
              taskToggle(elem.parentNode);
       });
});

const screenManager = new ScreenManager(screens);
const taskManager = new TaskManager(screenManager, taskList);

taskInfo.forEach(elem => {
       elem.addEventListener("click", () => {
              const task = elem.parentElement;
              const _taskDetails = screenManager.screens["taskDetails"].screenElem;
              const taskTitle = _taskDetails.querySelector(".taskTitle .text");
              const taskDesc = _taskDetails.querySelector(".taskDesc .text");
              const taskDeadline = _taskDetails.querySelector(".deadline .text");

              screenManager.changeTo("taskDetails");
              //code for checking the task info from the database
       });
});

closeTaskButton.addEventListener("click", () => {
       screenManager.changeTo(screenManager.previousScreen.name);
       createButton.classList.remove("hidden");
       closeTaskButton.classList.remove("active");
});
