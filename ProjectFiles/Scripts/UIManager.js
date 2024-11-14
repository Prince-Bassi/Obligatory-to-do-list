class UIManager {
       static addAnimationClass(elem, className, duration) {
              elem.classList.add(className);
              setTimeout(() => {
                     elem.classList.remove(className);
              }, duration * 1000);
       }

       static fadeIn(elem, duration = 1) {
              elem.style.setProperty("--animationDuration", `${duration}s`);
              this.addAnimationClass(elem, "fadeIn", duration);
       }

       static fadeOut(elem, duration = 1) {
              elem.style.setProperty("--animationDuration", `${duration}s`);
              this.addAnimationClass(elem, "fadeOut", duration);
       }

       static translate() {

       }
}

export default UIManager;