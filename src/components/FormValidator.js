export default class FormValidator { //принимает  конфиг и форму
    constructor (config, form) {
      this.config = config;//наш конфиг
      this.form = form;
      this.inputList = Array.from(this.form.querySelectorAll(config.inputSelector));//инпуты в форме
      this.button = this.form.querySelector(config.submitButtonSelector);//кнопка
    };
  
    _setInputValidState(input) { // принимаем 2 аргумента инпут и ошибку спан 
      const errorElement = this.form.querySelector(`.${input.id}-error`);
      input.classList.remove(this.config.inputErrorClass); // функция- выстави инпуту валидное состояние
      errorElement.textContent = '';
    };
  
    _setInputInvalidState(input) { // добавляет красный бордер и сообщение об ошибке
      const errorElement = this.form.querySelector(`.${input.id}-error`);
      input.classList.add(this.config.inputErrorClass); // функция- выстави инпуту невалидное состояние
      errorElement.textContent = input.validationMessage;
    };
  
    _checkInputValidity(input) {
      if (input.checkValidity()) {
        this._setInputValidState(input); 
      } else {
        this._setInputInvalidState(input); 
      }
    };
  
    _disableButton() {
      this.button.classList.add(this.config.inactiveButtonClass);
      this.button.setAttribute('disabled', true);
    }
  
    _enableButton() {
      this.button.removeAttribute('disabled'); 
      this.button.classList.remove(this.config.inactiveButtonClass); 
    }
  
    resetError() {
      this.inputList.forEach((inputElement) => {
        this._setInputValidState(inputElement);
      });
      this._disableButton();
    };
  
    _toggleButtonValidity() {
        if (this.form.checkValidity()) {  
              this._enableButton();
            } else {
              this._disableButton();
            }
      }
   
    _setEventListeners = () => {
      this.inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._toggleButtonValidity();
        });
      });
    };
  

    //Публичный метод enableValidation, который включает валидацию формы
    enableValidation = () => {
      this._setEventListeners();
    };
  };