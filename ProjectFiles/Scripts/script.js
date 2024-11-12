import TaskManager from "./taskManager.js";
import ScreenManager from "./screenManager.js";

const taskList = document.querySelector(".taskBody .taskList");
const createButton = document.querySelector("header .create");
const closeTaskButton = document.querySelector("header .closeTask");
const emptyList = document.querySelector(".taskBody .empty");
const checkmarks = document.querySelectorAll(".taskBody .taskList .task .checkmark");
const taskInfo = document.querySelectorAll(".taskBody .taskList .task .taskInfo");
const taskDetails = document.querySelector(".taskBody .taskDetails");
const screens = {"taskList": taskList, "emptyList": emptyList, "taskDetails": taskDetails};

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
