export default class Card { 
    constructor ({data, handleCardClick, userID, onLikeClick, confirmDeleteCard}, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._alt = data.name;

      this.ownerID = data.owner._id; //владелец
      this.owner = data.owner;// информация по владельцу 
      this.cardID = data._id; // id карточки 
      this.userID = userID;

      this.likes = data.likes;
      this._likeslength = data.likes.length; // кол-во лайков

      this._templateSelector = templateSelector;
      this.generateCard = this.generateCard.bind(this);
      this._element = this._getTemplate();
      this.elementImage = this._element.querySelector('.element__image');
      this.handleCardClick = handleCardClick;
      this.onLikeClick = onLikeClick;
      this._confirmDeleteCard = confirmDeleteCard;
    };

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
      this._likeButton = this._element.querySelector('.element__icon-like');
      this._likesCounter = this._element.querySelector('.element__icon-like-counter');// наш счетчик лайков
      this._likesCounter.textContent = this._likeslength; // цифра лайков
      this._deleteButton = this._element.querySelector('.element__delete-card-button');
      this._element.userID = this.userID;
      this._confirmationDeleteButton();

      return this._element; //вернёт элемент <div> полностью c содержимым
    };

    _confirmationDeleteButton() {
      if (this.userID !== this.ownerID) {
        this._deleteButton.remove();
        }
      }

      deleteCardItem() {
      this._element.remove();
      this._element = null; // очищаем  ссылку на DOM-элемент 
    }

    updateLikes(likes) {
      this.likes = likes;
      this.isLiked = this.likes.some((like) => like._id === this.userID)
      this._likeButton.classList.toggle('element__icon-like_active', this.isLiked)
      this._likesCounter.textContent = this.likes.length;
    }

    _setEventListeners = () => {
      const elementImage = this._element.querySelector('.element__image');
      this._element.querySelector('.element__icon-like')
      .addEventListener('click', () => {
        this.onLikeClick(this);
      });

      this._element.querySelector('.element__delete-card-button')
      .addEventListener('click', () => {
        this._confirmDeleteCard(this);// открываем попап
      });
    
      elementImage.addEventListener('click', () => {
        this.handleCardClick(this._name, this._link);
      });
    };
};
  