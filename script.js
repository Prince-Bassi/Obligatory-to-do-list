const taskList = document.querySelector(".taskBody .taskList");
const emptyList = document.querySelector(".taskBody .empty");
const checkmarks = document.querySelectorAll(".taskBody .taskList .task .checkmark");
const tasks = document.querySelectorAll(".taskBody .taskList .task");
const taskDetails = document.querySelector(".taskBody .taskDetails");
const taskDetailTitleText = document.querySelector(".taskBody .taskDetails .taskTitle .text");
const taskDetailDescText = document.querySelector(".taskBody .taskDetails .taskDesc .text");
const taskDetailDeadlineText = document.querySelector(".taskBody .taskDetails .deadline .text");
let ACTIVE_SCREEN = taskList;

document.addEventListener("keydown", (event) => {
       if (event.key == "k") {
              emptyList.classList.add("active");
              ACTIVE_SCREEN.classList.remove("active");
       }
});

function taskToggle(task) {
       task.classList.toggle("check");
}

function viewDetails(task) {
       taskDetailTitleText.textContent = "Check";
       taskDetailDescText.textContent = "Description";
       taskDetailDeadlineText.textContent = "Moay";

       taskDetails.classList.add("active");
       ACTIVE_SCREEN.classList.remove("active");
}

checkmarks.forEach(elem => {
       elem.addEventListener("click", () => {
              taskToggle(elem.parentNode);
       });
});

tasks.forEach(elem => {
       elem.addEventListener("click", () => {
              viewDetails(elem);
       });
});