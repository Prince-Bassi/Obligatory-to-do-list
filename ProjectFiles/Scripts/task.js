import taskManager from "./taskManager.js";
import messagePopUp from "./messagePopUp.js";

class Task {
       constructor(elem, taskData, taskManager) {
              this.initialTaskData = taskData;
              this.taskData = taskData;
              this.id = this.taskData.id;

              this.taskManager = taskManager;
              this.elem = elem;
       }

       toggle() {
              if (this.taskData.completed) {
                     this.taskData.completed = false;
                     this.elem.classList.remove("check");
              }
              else {
                     this.taskData.completed = true;
                     this.elem.classList.add("check");
              }
       }

       delete() {
              fetch("/deleteTask", {
                     method: "DELETE",
                     headers: {
                            "Content-Type": "application/json"
                     },
                     body: JSON.stringify({id: this.id})
              })
              .then(response => response.text())
              .then(data => {                     
                     taskManager.displayTasks();
                     messagePopUp.show("Task Deleted Successfully", 3000);
              })
              .catch(err => console.error(err));
       }
}

export default Task;