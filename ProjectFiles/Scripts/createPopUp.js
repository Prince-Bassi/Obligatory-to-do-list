import UIManager from "./UIManager.js";

const createPopUpElem = document.querySelector(".createPopUp");
const header = document.querySelector("header");
const section = document.querySelector("section");

class CreatePopUp {
       static open() {
              createPopUpElem.classList.add("active");
              UIManager.background(header, false, "2px", 0.3);
              UIManager.background(section, false, "2px", 0.3);
       }

       static close() {
              createPopUpElem.classList.remove("active");
              UIManager.background(header, true);
              UIManager.background(section, true);
       }
}

export default CreatePopUp;