import Components from "./components.js";
import UIManager from "./UIManager.js";

class ConfirmBox {
       constructor() {
              this.elem = Components.createConfirmationBox();

              this.messageElem = this.elem.querySelector(".message");
              this.cancelButton = this.elem.querySelector(".cancel");
              this.confirmButton = this.elem.querySelector(".confirmButton");

              this.handleConfirm = this.handleConfirm.bind(this);
              this.handleCancel = this.handleCancel.bind(this);

              this.elem.addEventListener("transitionend", () => {
                     if (!this.elem.classList.contains("active")) {
                            this.elem.remove();                     
                     }
              });
       }

       handleCancel() {
              this.close();
       }

       handleConfirm() {
              if (this.confirmfunc) this.confirmfunc();
              this.close();
       }

       confirmation(message, confirmfunc) {
              this.confirmfunc = confirmfunc;
              this.messageElem.textContent = message;

              document.body.appendChild(this.elem);
              this.elem.offsetWidth; //Force a reflow for transition to work

              this.confirmButton.addEventListener("click", this.handleConfirm);
              this.cancelButton.addEventListener("click", this.handleCancel);

              this.elem.classList.add("active");
              UIManager.background("header", false, "2px", 0.4);
              UIManager.background("section", false, "2px", 0.4);
       }

       close() {
              UIManager.background("header", true);
              UIManager.background("section", true);
              this.elem.classList.remove("active");
              this.confirmButton.removeEventListener("click", this.handleConfirm);
              this.cancelButton.removeEventListener("click", this.handleCancel);
       }
}

const confirmBox = new ConfirmBox();

export default confirmBox;