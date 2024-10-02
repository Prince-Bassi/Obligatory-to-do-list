taskList = document.querySelector(".taskBody .taskList");
emptyList = document.querySelector(".taskBody .empty");
tasks = document.querySelectorAll(".taskBody .taskList .task");

document.addEventListener("keydown", (event) => {
       if (event.key == "k") {
              taskList.classList.toggle("active");
              emptyList.classList.toggle("active");
       }
});

function taskToggle(elem) {
       elem.classList.toggle("check");
}

tasks.forEach(elem => {
       elem.addEventListener("click", () => {
              taskToggle(elem);
       });
});