function createComponent(tag, classes = [], children = [], text = "") {
       const elem = document.createElement(tag);
       elem.textContent = text;
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
              ], taskData.title);

              const deadlineValue = new Date(taskData.deadline);
              const deadline = createComponent("div", ["deadline"], [], `Deadline: ${deadlineValue.getDate()} ${deadlineValue.toLocaleString("en", {month: "short"})} ${deadlineValue.getFullYear()}`);

              // Options elem
              const optionMenu = createComponent("div", ["optionsMenu"], [
                     createComponent("div", ["deleteButton"], [], "Delete"),
                     createComponent("div", ["editButton"], [], "Edit")
              ]);
              const options = createComponent("div", ["options"], [
                     createComponent("i", ["fa-solid", "fa-ellipsis-v"]),
                     optionMenu
              ]);

              const taskInfo = createComponent("div", ["taskInfo"], [
                     taskTitle,
                     deadline,
                     options

              ]);

              const task = createComponent("div", ["task"], [
                     checkmark,
                     taskInfo
              ]);

              return task;
       }
}

export default Components;