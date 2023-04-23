
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
    setInputValidState(config, input, errorElement); 
  } else {
    setInputInvalidState(config, input, errorElement); 
  }
}


export function disableButton(config, button) {
  button.classList.add(config.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

export function enableButton(config, button) {
  button.removeAttribute('disabled'); 
  button.classList.remove(config.inactiveButtonClass); 
}

function toggleButtonValidity(config, form) {
  const submitButton = form.querySelector(config.submitButtonSelector);
    if (form.checkValidity()) {  
          enableButton(config, submitButton);
        } else {
          disableButton(config, submitButton);
        }
   }


function setEventListeners(config, form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(config, form, input);
      toggleButtonValidity(config, form);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(config,form);
  });
};

 export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type_invalid',
  errorClass: 'popup__text-error'
};

enableValidation(config);