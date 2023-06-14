import {config} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'  
import PopupWithImage from '../components/PopupWithImage.js'
//import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
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
let userId = null;

//Api 
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '79aff481-506e-4c4c-8308-be7829df1002',
    'Content-Type': 'application/json'
  }
});

// получение инфы о пользователе
api.getUserData().then((userData) => {
  userInfo.setUserInfo (userData);
  userInfo.setUserAvatar(userData.avatar);
})


  api.getInitialCards().then((cardList) => {
    const section = new Section(
      {
        items: cardList, 
        renderer: createCard,
      }
      , cardSection)
      section.renderItems()
    }).catch(err => console.log(err))

    function createCard(data) {
      const card = new Card({data, handleCardClick, openPopupForConfirm},'.card-template', api, userId); 
       renderCard(card.generateCard())
       return card;
    }
    
    function renderCard(card) { //card - div элемент карточки 
      cardSection.prepend(card);
    };



// для каждого попапа с формами  создаем свой экземпляр класса PopupWithForm
// создаем два экземпляра класса PopupWithForm, в каждый передаем свой коллбек (помимо селектора попапа)
const popupEditProfile = new PopupWithForm(profileEditPopup, addProfileInfo);
popupEditProfile.setEventListeners();

const popupForAddCard = new PopupWithForm(cardAddPopup, addCardOnPage);
popupForAddCard.setEventListeners();

const popupForEditAvatar = new PopupWithForm(avatarEditPopup, editProfileAvatar);
popupForEditAvatar.setEventListeners();

function editProfileAvatar(avatar) {
  api.getNewAvatar(avatar).then((newAvatar) => 
  userInfo.setUserAvatar(newAvatar.avatar))
  .catch((err) => {
    console.log(err); 
  }); 
  popupForEditAvatar.closePopup();
}

const popupForDeleteCard = new PopupWithConfirmation(cardDeletePopup, deleteAfterConfirm);
popupForDeleteCard.setEventListeners();

export const popupBigImage = new PopupWithImage(cardPopup);
popupBigImage.setEventListeners();

// user info
const userInfo = new UserInfo({profileName, profileDescription, profileAvatar});


//валидация 
export const formEditProfileValidator = new FormValidator(config, formEditProfile);
export const formAddImageValidator = new FormValidator(config, formAddImage);
export const formEditAvatarValidator = new FormValidator(config, formForEditAvatar);

formEditProfileValidator.enableValidation();
formAddImageValidator.enableValidation();
formEditAvatarValidator.enableValidation();



//Функции добавления информации пользователя и добавления карточки в профиль
function addProfileInfo(data) {
  api.getUpdateUserData(data).then((userData) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
    console.log('13', userInfo);
    popupEditProfile.closePopup();
  });
};

function addCardOnPage(data) {
  api.postNewCard(data).then(newCard => {
  (createCard(newCard));
  }).catch((err) => {
      console.log(err);
    }); 
  popupForAddCard.closePopup();// добавление новой карточки через форму
};

function deleteAfterConfirm() {
  //console.log('1', cardElement);
  //deleteCardElement();
  popupForDeleteCard.closePopup()
}


// Функция клика по изображению
function handleCardClick(name, link) {
  popupBigImage.openPopup(name, link);
};

function openPopupForConfirm() {
  popupForDeleteCard.openPopup();
};

//слушатели для открытия попапов на кнопки изменений
buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.openPopup();
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData); // и дальше нужно будет передать эти данные в форму
  formEditProfileValidator.resetError(); //чистим форму от ошибок + кнопка
});

cardAddButton.addEventListener('click', () => {
  popupForAddCard.openPopup();
  formAddImageValidator.resetError(); //чистим форму от ошибок + кнопка
});

 avatarEditButton.addEventListener('click', () => {
  popupForEditAvatar.openPopup();
  formEditAvatarValidator.resetError();
 });

 

//section.renderItems();