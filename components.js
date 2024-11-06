function createComponent(tag, classes = [], children = []) {
       const elem = document.createElement(tag);
       if (children) {
              for (let child of children) {
                     elem.appendChild(child);
              }
       }
       if (classes) elem.classList.add(...classes);

       return elem;
}

const Components = {
       createTask(taskData) {
              const checkmark = createComponent("div", ["checkmark"], [
                     createComponent("i", ["fa", "fa-check"]),
                     createComponent("div", ["checkOverlay"]),
                     createComponent("div", ["innerCircle"])
              ]);

              const taskTitle = createComponent("div", ["taskTitle"], [
                     createComponent("div", ["lineThrough"])
              ]);
              taskTitle.textContent = taskData.title;

              const deadline = createComponent("div", ["deadline"]);
              deadline.textContent = taskData.deadline;

              const taskInfo = createComponent("div", ["taskInfo"], [
                     taskTitle,
                     deadline
              ]);

              const task = createComponent("div", ["task"], [
                     checkmark,
                     taskInfo
              ]);

              return task;
       }
}

export default Components;