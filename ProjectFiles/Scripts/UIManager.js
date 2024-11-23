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

       /** 
        * @param {String} elem
        * @param {String} blurValue
        * @param {Number} duration
       */
       static background(selector, remove = false, blurValue, duration = 1) {
              const elem = document.querySelector(selector);
              if (remove) {
                     elem.classList.remove("background");
                     return;
              }
              elem.style.setProperty("--blurValue", blurValue);
              elem.style.transition = `filter ${duration}s`;
              elem.classList.add("background");
       }

       static translate() {

       }
}

export default UIManager;