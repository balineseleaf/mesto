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
    this._form = this.popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit');
  };

  _getInputValues() {
    const inputs = this._form.querySelectorAll('.popup__input'); // массив всех элементов полей
    return Array.from(inputs).reduce((formData, input) => {
      formData[input.name] = input.value;// добавляем в этот объект значения всех полей
      return formData; // возвращаем объект , состоящий из двух полей - name и link, взяли мы их из инпутов
    }, {})
  };

  setInputValues(userData) { //передача в метод установки значений инпутов у класса PopupWithForm
    const inputs = this._form.querySelectorAll('.popup__input');
      inputs.forEach((input) => {
        input.value = userData[input.name]; 
      })
    };

    
    // родительский метод close + очистка формы
    closePopup() {
      super.closePopup();
      this._form.reset();
    }
    
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        this.handlePopupSubmit(evt)
      });
    };

    async handlePopupSubmit(evt) {
      evt.preventDefault();
      const originalText = this._submitButton.textContent;
      try {
        this._submitButton.textContent = 'Сохранение...';
        await this._handleFormSubmit(this._getInputValues());
        this.closePopup();
      } finally {
        this._submitButton.textContent = originalText;
      }
    }
  };