// Класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке 
// закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.

export default class Popup {
    constructor (popupSelector) { 
      this.popupSelector = popupSelector; //popupSelector - селектор конкретного попапа
      this._handleEscClose = this._handleEscClose.bind(this); //без этого не работает закрытие на esc, контекст теряется
    };
  
    openPopup() {
      this.popupSelector.classList.add('popup_opened'); 
      document.addEventListener('keydown', this._handleEscClose);
    };
  
    closePopup() {
      this.popupSelector.classList.remove('popup_opened'); 
      document.removeEventListener('keydown', this._handleEscClose);
    };
   
    _handleEscClose(evt) {
      if(evt.key === 'Escape') { 
        this.closePopup();
       };
    };
    
    setEventListeners() {

      // закрытие на overlay
      this.popupSelector.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
          this.closePopup();
        };
      });
    };
  };
