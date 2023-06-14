export default class Card { 
    constructor ({data, handleCardClick, openPopupForConfirm}, templateSelector, api, userId) {
      
      //console.log(data);// массив карточек с сервера
      this._name = data.name;
      this._link = data.link;
      this._alt = data.name;
      this._templateSelector = templateSelector;
      this.generateCard = this.generateCard.bind(this);
      this._element = this._getTemplate();
      this.elementImage = this._element.querySelector('.element__image');
      this.handleCardClick = handleCardClick;
      this.openPopupForConfirm = openPopupForConfirm;
      this._id = data.id;
      this._api = api;
      this._userId = userId;
    };

     //два метода для отрисовки 6 карточек из массива
    _getTemplate() {//получение новой карточки из темплейта
      const cardElement = document
      .querySelector(this._templateSelector) //найдёт template-элемент
      .content // содержимое
      .querySelector('.element') //в содержимом найдёт элемент с классом
      .cloneNode(true); //клонирует его
      return cardElement; //вернёт элемент <div> полностью без содержимого
    };
  
    generateCard() { //метод, который возьмет данные из массива initialCards и в каждую карточку закинет название и ссылку
      this._setEventListeners(); //добавили обработчики
      this._element.querySelector('.element__caption').textContent = this._name;//добавляем данные
      this.elementImage.src = this._link;
      this.elementImage.alt = this._alt;
      return this._element; //вернёт элемент <div> полностью c содержимым
    };

    _setEventListeners = () => {
      const elementImage = this._element.querySelector('.element__image');
      this._element.querySelector('.element__delete-card-button')
      .addEventListener('click', () => {
        this.openPopupForConfirm();
        //this._deleteCardElement();
      });
    
      this._element.querySelector('.element__icon-like').addEventListener('click', () => {
        this._handleLikeCardElement();
      });
    
      elementImage.addEventListener('click', () => {
        this.handleCardClick(this._name, this._link);
      });
    };
    
      _handleLikeCardElement() {
        this._element.querySelector('.element__icon-like')
        .classList.toggle('element__icon-like_active');
      };
    
      deleteCardElement = () => {
        this._element.remove();
        this._element = null;
      };
    };
  