class Task {
       constructor(elem, taskData, taskManager) {
              this.initialTaskData = taskData;
              this.taskData = taskData;
              this.id = this.taskData.id;

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

export default Task;