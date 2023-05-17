import { openBigImage } from './index.js'

export default class Card { 
    constructor (data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._alt = data.name;
      this._templateSelector = templateSelector;
      this.generateCard = this.generateCard.bind(this);
      this.openBigImage = openBigImage;
    };
  
    _getTemplate() {//добавление новой карточки на страницу
      const cardElement = document
      .querySelector(this._templateSelector) //найдёт template-элемент
      .content // содержимое
      .querySelector('.element') //в содержимом найдёт элемент с классом
      .cloneNode(true); //клонирует его
     
      return cardElement; //вернёт клонированный элемент
    };
  
    generateCard() { //метод, который вставит данные в разметку и подготовит карточку
      this._element = this._getTemplate();
      this._setEventListeners(); //добавили обработчики
      this._element.querySelector('.element__caption').textContent = this._name;//добавляем данные
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').alt = this._alt;
      return this._element;
    };

    _setEventListeners = () => {
      this._element
      .querySelector('.element__delete-card-button')
      .addEventListener('click', () => {
        this._deleteCardElement();
      });
    
      this._element
      .querySelector('.element__icon-like')
      .addEventListener('click', () => {
        this._handleLikeCardElement();
      });
    
      this._element
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this.openBigImage(this._name, this._link);
      });
    };
    
      _handleLikeCardElement() {
        this._element
        .querySelector('.element__icon-like')
        .classList.toggle('element__icon-like_active');
      };
    
      _deleteCardElement = () => {
        this._element.remove();
      };
    };
  