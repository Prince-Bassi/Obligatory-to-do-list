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
       createConfirmationBox() {
              const message = createComponent("div", ["message"]);
              const confirmButton = createComponent("button", ["confirmButton"], [], "Confirm");
              const cancelButton = createComponent("button", ["cancel"], [], "Cancel");

              const buttons = createComponent("div", ["buttons"], [
                     confirmButton,
                     cancelButton
              ]);

              const confirmBox = createComponent("div", ["confirmBox"], [
                     message,
                     buttons
              ]);

              return confirmBox;
       },

       createTask(taskData) {
              //Checkmark
              const checkPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
              checkPath.setAttribute("d", "M6 15 L12 20 L21 10");

              const checkmark = document.createElementNS("http://www.w3.org/2000/svg", "svg");
              checkmark.classList.add("checkmark");

              checkmark.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "circle"));
              checkmark.appendChild(checkPath);

              //Task info
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