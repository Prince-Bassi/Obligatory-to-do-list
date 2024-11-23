const popUpElem = document.querySelector(".messagePopUp");

class MessagePopUp {
       constructor(elem) {
              this.elem = elem;

              this.elem.addEventListener("transitionend", () => {
                     if (!this.elem.classList.contains("active")) {
                            this.elem.textContent = "";
                     }
              });
       }

       show(message, duration) {
              this.elem.textContent = message;
              this.elem.classList.add("active");
              setTimeout(() => {
                     this.elem.classList.remove("active");
              }, duration);
       }
}

const messagePopUp = new MessagePopUp(popUpElem);

export default messagePopUp;