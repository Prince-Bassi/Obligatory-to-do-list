import UIManager from "./UIManager.js";

class Screen {
       constructor(screenManager, screenElem, name) {
              this.screenManager = screenManager;
              this.screenElem = screenElem;
              this.name = name;
       }

       display() {
              this.screenElem.classList.add("active");
              UIManager.fadeIn(this.screenElem, 0.5);
       }

       hide() {
              this.screenElem.classList.remove("active");
              UIManager.fadeOut(this.screenElem, 0.5);
       }
}

export default Screen;