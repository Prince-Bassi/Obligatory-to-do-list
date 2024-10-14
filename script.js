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

              this.activeScreen = this.screens["emptyList"];
              this.previousScreen;

              this.activeScreen.display();
       }

       changeTo(screen) {
              const screenObj = this.screens[screen];

              this.activeScreen.hide();
              screenObj.display();

              this.previousScreen = this.activeScreen;
              this.activeScreen = screenObj;
       }
}

class Task {
       constructor(taskManager, taskElem) {
              this.taskManager = taskManager;
              this.taskElem = taskElem;
       }
}

class TaskManager {
       constructor(screenManager) {
              this.screenManager = screenManager;
              this.tasks = [];

              this.screenManager.changeTo("taskList");
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
const taskManager = new TaskManager(screenManager);

taskInfo.forEach(elem => {
       elem.addEventListener("click", () => {
              const task = elem.parentElement;
              const _taskDetails = screenManager.screens["taskDetails"].screenElem;
              const taskTitle = _taskDetails.querySelector(".taskTitle .text");
              const taskDesc = _taskDetails.querySelector(".taskDesc .text");
              const taskDeadline = _taskDetails.querySelector(".deadline .text");

              createButton.classList.add("hidden");
              closeTaskButton.classList.add("active");
              screenManager.changeTo("taskDetails");
              //code for checking the task info from the database
       });
});

closeTaskButton.addEventListener("click", () => {
       screenManager.changeTo(screenManager.previousScreen.name);
       createButton.classList.remove("hidden");
       closeTaskButton.classList.remove("active");
});
