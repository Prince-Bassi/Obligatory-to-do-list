import taskManager from "./taskManager.js";
import CreatePopUp from "./createPopUp.js";
import screenManager from "./screenManager.js";

const createButton = document.querySelector("header .create");
const closeTaskButton = document.querySelector(".closeTask");

taskManager.displayTasks();

closeTaskButton.addEventListener("click", () => {
       screenManager.changeTo(screenManager.previousScreen.name);

       createButton.classList.remove("hidden");
       closeTaskButton.classList.remove("active");
});

createButton.addEventListener("click", () => {
       CreatePopUp.open();
});

const autosaveInterval = setInterval(() => {
       taskManager.updateTaskData();
}, 30000);

window.addEventListener("beforeunload", () => {
       taskManager.updateTaskData();
});