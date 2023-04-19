
function setInputValidState(config, input, errorElement) { // принимаем 2 аргумента инпут и ошибку спан 
  input.classList.remove(config.inputErrorClass); // функция- выстави инпуту валидное состояние
  errorElement.textContent = '';
}

function setInputInvalidState(config, input, errorElement) { // добавляет красный бордер и сообщение об ошибке
  input.classList.add(config.inputErrorClass); // функция- выстави инпуту невалидное состояние
  errorElement.textContent = input.validationMessage;
}

function checkInputValidity(config, form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`); // span 
  if (input.checkValidity()) {
    setInputValidState(config, input, errorElement); // передаем инпут и наш спан 
  } else {
    setInputInvalidState(config, input, errorElement); // передаем инпут и наш спан 
  }
}

function toggleButtonValidity(form) {
popupSubmitButton.forEach(function(button) {
  disableButton(popupSubmitButtonAddCArd);
  if (form.checkValidity()) {  // 
        enableButton(button);
      } else {
        disableButton(button);
      }
 });
}

function disableButton(button) {
  button.classList.add('popup__submit_inactive');
  button.setAttribute('disabled', true);
}

function enableButton(button) {
  button.removeAttribute('disabled'); // убираем дизейбл с кнопки
  button.classList.remove('popup__submit_inactive'); // снимаем прозрачность с кнопки
}


const setEventListeners = (config, form) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(config, form, input);
      toggleButtonValidity(form);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      form.reset();
    });

    setEventListeners(config,form);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type_invalid',
  errorClass: 'popup__text-error'
}); 