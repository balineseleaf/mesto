import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithConfirmation extends PopupWithForm {

   setEventListeners() {
    super.setEventListeners();
    const confirmButton = document.querySelector('.popup__submitDeleteCard');
    confirmButton.addEventListener('submit', () => {
      evt.preventDefault();
      this.deleteAfterConfirm();
    });
   };
};