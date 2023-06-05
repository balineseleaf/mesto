import Popup from '../components/Popup.js';
// Класс PopupWithImage, который наследует от Popup. 
// Этот класс должен перезаписывать родительский метод open. 
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src 
// изображения и подписью к картинке.

export default class PopupWithImage extends Popup { 
  constructor (popup) {
    super(popup);
    this._text = this.popup.querySelector('.popup__image-text'); // в вебинаре QA
    this._link = this.popup.querySelector('.popup__image'); // аналогично 
  };

  openPopup(name, link) { // Дай мне эти параметры, при открытии попапа, и я их вставлю в разметку
    super.openPopup(); // вызываем родительский метод, он уже все умеет , а здесь мы его дополняем
      this._link.src = link; // заполняем данными
      this._text.textContent = name; 
      this._link.alt = name; 
  };
};  