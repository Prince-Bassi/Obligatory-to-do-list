import Screen from "./screen.js";

class ScreenManager {
       constructor(screens) {
              const screenObjKeys = Object.keys(screens);
              this.screens = {};

              for (let i of screenObjKeys) {
                     this.screens[i] = new Screen(this, screens[i], i);
              }

              this.activeScreen = this.screens["taskList"];
              this.previousScreen;

              this.activeScreen.display();
       }

       changeTo(screen) {
              const screenObj = this.screens[screen];
              if (screen === this.activeScreen) {
                     return;
              }

              this.activeScreen.hide();
              screenObj.display();

              this.previousScreen = this.activeScreen;
              this.activeScreen = screenObj;
       }
}

export default ScreenManager;