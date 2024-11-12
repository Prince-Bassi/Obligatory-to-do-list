class Screen {
       constructor(screenManager, screenElem, name) {
              this.screenManager = screenManager;
              this.screenElem = screenElem;
              this.name = name;
       }

       display() {
              this.screenElem.classList.add("active");
       }

       hide() {
              this.screenElem.classList.remove("active");
       }
}

export default Screen;