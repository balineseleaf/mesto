import {config} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'  
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from  '../components/Api.js';
import '../pages/index.css' // подключение css

const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
export const nameInput = profileEditPopup.querySelector('.popup__input_type_name');
export const descriptionInput = profileEditPopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image')
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_card-add');
const cardPopup = document.querySelector('.popup_type_picture');
export const avatar = cardPopup.querySelector('.popup__image');
export const text = cardPopup.querySelector('.popup__image-text');
export const formEditProfile = document.querySelector('.popup__form_edit-profile');
export const formAddImage = document.querySelector('.popup__form_add-image');
export const formForEditAvatar = document.querySelector('.popup__form_edit-avatar')
export const cardSection = document.querySelector('.elements');

const avatarEditButton = document.querySelector('.profile__info-container');
const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');
const cardDeletePopup = document.querySelector('.popup_type_confirm-delete-card');

//Api 
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '79aff481-506e-4c4c-8308-be7829df1002',
    'Content-Type': 'application/json'
  }
});

let userID = null; // Создаем объект для данных профиля

Promise.all([
    api.getInitialCards(), 
    api.getUserData() 
])
.then(([cardList, userData]) => {
  userID = userData._id;// наполняем объект свойствами
  const section = new Section(
    {
      items: cardList.reverse(), 
      renderer: createCard,
    }
    , cardSection)
    section.renderItems()
  userInfo.setUserInfo(userData);
}).catch((err) => console.log(`catch: ${err}`))

function createCard(data) {
  const card = new Card({data, handleCardClick, userID, onLikeClick, confirmDeleteCard},'.card-template'); 
    renderCard(card.generateCard())
    return card;
}
    
function renderCard(card) { //card - div элемент карточки 
  cardSection.prepend(card);
};

function onLikeClick (card) {
  if(card.isLiked) {
    api.deleteLike(this.cardID)
    .then((data) => card.updateLikes(data.likes))
    .catch((err) => console.log(`catch: ${err}`))
  } else {
    api.addLike(this.cardID)
    .then((data) => card.updateLikes(data.likes))
    .catch((err) => console.log(`catch: ${err}`))
  }
}


// для каждого попапа с формами  создаем свой экземпляр класса PopupWithForm
// создаем два экземпляра класса PopupWithForm, в каждый передаем свой коллбек (помимо селектора попапа)

const popupEditProfile = new PopupWithForm(profileEditPopup, addProfileInfo);
popupEditProfile.setEventListeners();

const popupForAddCard = new PopupWithForm(cardAddPopup, addCardOnPage);
popupForAddCard.setEventListeners();

// удаление карточки 
const popupForDeleteCard = new PopupWithConfirmation(cardDeletePopup);
popupForDeleteCard.setEventListeners();

function confirmDeleteCard(card) {
  popupForDeleteCard.openPopup(() => deleteCardItem(card));
}

function deleteCardItem(card) {
    api.deleteCard(card.cardID)
    .then(() => {
      card.deleteCardItem();
    }).catch((err) => console.log(`catch: ${err}`))
  }


// зум изображения
export const popupBigImage = new PopupWithImage(cardPopup);
popupBigImage.setEventListeners();

// редактиврование Аватарки
const popupForEditAvatar = new PopupWithForm(avatarEditPopup, editProfileAvatar);
popupForEditAvatar.setEventListeners();

function editProfileAvatar(avatar) {
  api.setNewAvatar(avatar).then((data) => 
  userInfo.setUserAvatar(data.avatar))
  .catch((err) => console.log(`catch: ${err}`)); 
  //popupForEditAvatar.closePopup();
}

// информация о пользователе
const userInfo = new UserInfo({profileName, profileDescription, profileAvatar});

// валидация 
export const formEditProfileValidator = new FormValidator(config, formEditProfile);
export const formAddImageValidator = new FormValidator(config, formAddImage);
export const formEditAvatarValidator = new FormValidator(config, formForEditAvatar);

formEditProfileValidator.enableValidation();
formAddImageValidator.enableValidation();
formEditAvatarValidator.enableValidation();

//Функции добавления информации пользователя и добавления карточки в профиль
function addProfileInfo(data) {
  api.setUpdateUserData(data).then((userData) => {
    userInfo.setUserInfo(userData); // userInfo - объект с 3 полями.. name, about, avatar
    popupEditProfile.closePopup();
  });
};

function addCardOnPage(data) {
  api.postNewCard(data).then(newCard => {
  (createCard(newCard));
  }).catch((err) => console.log(`catch: ${err}`));
  popupForAddCard.closePopup();// добавление новой карточки через форму
};

// Функция клика по изображению
function handleCardClick(name, link) {
  popupBigImage.openPopup(name, link);
};

//слушатели для открытия попапов на кнопки изменений
buttonEditProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData); // и дальше нужно будет передать эти данные в форму
  formEditProfileValidator.resetError(); //чистим форму от ошибок + кнопка
  popupEditProfile.openPopup();
});

cardAddButton.addEventListener('click', () => {
  popupForAddCard.openPopup();
  formAddImageValidator.resetError(); //чистим форму от ошибок + кнопка
});

avatarEditButton.addEventListener('click', () => {
  popupForEditAvatar.openPopup();
  formEditAvatarValidator.resetError();
});