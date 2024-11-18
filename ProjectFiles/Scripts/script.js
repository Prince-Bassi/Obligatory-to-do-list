import TaskManager from "./taskManager.js";
import CreatePopUp from "./createPopUp.js";
import ScreenManager from "./screenManager.js";

const taskList = document.querySelector(".taskBody .taskList");
const createButton = document.querySelector("header .create");
const closeTaskButton = document.querySelector(".closeTask");
const emptyList = document.querySelector(".taskBody .empty");
const taskDetails = document.querySelector(".taskBody .taskDetails");
const screens = {"taskList": taskList, "emptyList": emptyList, "taskDetails": taskDetails};

const screenManager = new ScreenManager(screens);
const taskManager = new TaskManager(screenManager, taskList);

closeTaskButton.addEventListener("click", () => {
       screenManager.changeTo(screenManager.previousScreen.name);

       createButton.classList.remove("hidden");
       closeTaskButton.classList.remove("active");
});

createButton.addEventListener("click", () => {
       CreatePopUp.open();
});

