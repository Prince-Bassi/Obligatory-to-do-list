import UIManager from "./UIManager.js";
import taskManager from "./taskManager.js"

const createPopUpElem = document.querySelector(".createPopUp");
const header = document.querySelector("header");
const section = document.querySelector("section");
const createForm = document.querySelector(".createForm");
const errorMessage = document.querySelector(".createBody .errorMessage");

class CreatePopUp {
       constructor() {
              this.boundCloseLogic = this.closeLogic.bind(this);

              createForm.addEventListener("submit", (event) => {
                     event.preventDefault();

                     const formData = new FormData(event.target);

                     const deadline = new Date(formData.get("deadline"));
                     const today = new Date();
                     
                     if (deadline < today) {
                            errorMessage.textContent = `Deadline cannot be before today (${today.toISOString().split("T")[0]})`;
                            errorMessage.classList.add("active");
                            return;
                     }
                     

                     const data = Object.fromEntries(formData.entries());

                     fetch("/addTask", {
                            method:"POST",
                            headers: {
                                   "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                     })
                     .then(response => response.text())
                     .then(data => {
                            console.log(data);
                            this.close();
                            taskManager.displayTasks();
                            errorMessage.textContent = "";
                            errorMessage.classList.remove("active");
                            createForm.reset();
                     });
              });
       }

       closeLogic(event) {
              if ((event.target.id === "cancel" || !createPopUpElem.contains(event.target))) this.close();
       }

       open() {
              createPopUpElem.classList.add("active");
              setTimeout(() => {
                     this.cancelEvent = document.addEventListener("click", this.boundCloseLogic);
              }, 100);

              UIManager.background(header, false, "2px", 0.3);
              UIManager.background(section, false, "2px", 0.3);
       }

       close() {
              createPopUpElem.classList.remove("active");
              UIManager.background(header, true);
              UIManager.background(section, true);
              document.removeEventListener("click", this.boundCloseLogic);
              createForm.reset();
       }
}

const createPopUpObj = new CreatePopUp();

export default createPopUpObj;