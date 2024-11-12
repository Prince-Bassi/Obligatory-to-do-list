class UIManager {
       addAnimationClass(className, duration) {
              elem.classList.add(className);
              setTimeout(() => {
                     elem.classList.remove(className);
              }, duration * 1000);
       }

       static fadeIn(elem, duration = 1) {
              elem.style.setProperty("--animationDuration", `${duration}s`);
              this.addAnimationClass("fadeIn", duration);
       }

       static fadeOut(elem, duration = 1) {
              elem.style.setProperty("--animationDuration", `${duration}s`);
              this.addAnimationClass("fadeOut", duration);
       }

       static translate() {

       }
}

export default UIManager;