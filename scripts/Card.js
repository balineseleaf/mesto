export default class Card { 
    constructor (data, templateSelector, onClick) {
      console.log(data);
      console.log(onClick);
      this._name = data.name;
      this._link = data.link;
      this._alt = data.name;
      this._templateSelector = templateSelector;
      this.generateCard = this.generateCard.bind(this);
      this._element = this._getTemplate();
      this.elementImage = this._element.querySelector('.element__image');
      this.onClick = onClick;
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
      this._setEventListeners(); //добавили обработчики
      this._element.querySelector('.element__caption').textContent = this._name;//добавляем данные
      this.elementImage.src = this._link;
      this.elementImage.alt = this._alt;
      return this._element;
    };

    _setEventListeners = () => {
      const elementImage = this._element.querySelector('.element__image');
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
    
      elementImage //open big image
      .addEventListener('click', () => {
        this.onClick(this._name, this._link);
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
  