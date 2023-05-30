import Popup from '../components/Popup.js';

// Класс PopupWithForm, который наследует от Popup. Этот класс,
// кроме селектора попапа, принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm 
// должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик 
// сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.

export default class PopupWithForm extends Popup { 
  constructor (popup, handleFormSubmit) { 
    super(popup);
    this._handleFormSubmit = handleFormSubmit; // кроме селектора попапа принимает в конструктор колбэк сабмита формы
    this._form = this.popupSelector.querySelector('.popup__form');
  };

  _getInputValues() {
    const inputs = this._form.querySelectorAll('.popup__input'); // массив всех элементов полей
    return Array.from(inputs).reduce((formData, input) => {
      formData[input.name] = input.value;// добавляем в этот объект значения всех полей
      return formData; // возвращаем объект значений
    }, {})
  };

  setInputValues(userData) { //передача в метод установки значений инпутов у класса PopupWithForm
    const inputs = this._form.querySelectorAll('.popup__input');
      inputs.forEach((input) => {
        input.value = userData[input.name]; 
      })
    };

  // родительский метод close + очитска формы
  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form
    .addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  };
};