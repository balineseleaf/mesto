import { initialCards, config} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'  
import PopupWithImage from '../components/PopupWithImage.js'
//import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css' // подключение css
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
export const nameInput = profileEditPopup.querySelector('.popup__input_type_name');
export const descriptionInput = profileEditPopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_card-add');
const cardPopup = document.querySelector('.popup_type_picture');
export const image = cardPopup.querySelector('.popup__image');
export const text = cardPopup.querySelector('.popup__image-text');
export const formEditProfile = document.querySelector('.popup__form_edit-profile');
export const formAddImage = document.querySelector('.popup__form_add-image');
export const formForEditAvatar = document.querySelector('.popup__form_edit-avatar')
export const elements = document.querySelector('.elements');

const avatarEditButton = document.querySelector('.profile__info-container');
const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');
const cardDeletePopup = document.querySelector('.popup_type_confirm-delete-card');
// const buttonForDeleteCard = document.querySelector('.element__delete-card-button');
// console.log('1', buttonForDeleteCard);

const section = new Section(
  {
    items: initialCards, 
    renderer: renderCard 
  }
  , elements);

// для каждого попапа с формами  создаем свой экземпляр класса PopupWithForm
// создаем два экземпляра класса PopupWithForm, в каждый передаем свой коллбек (помимо селектора попапа)
const popupEditProfile = new PopupWithForm(profileEditPopup, addProfileInfo);
popupEditProfile.setEventListeners();

const popupForAddCard = new PopupWithForm(cardAddPopup, addCardOnPage);
popupForAddCard.setEventListeners();

const popupForEditAvatar = new PopupWithForm(avatarEditPopup, editProfileAvatar);
popupForEditAvatar.setEventListeners();

const popupForDeleteCard = new PopupWithConfirmation(cardDeletePopup, deleteAfterConfirm);
popupForDeleteCard.setEventListeners();

export const popupBigImage = new PopupWithImage(cardPopup);
popupBigImage.setEventListeners();


const userInfo = new UserInfo({profileName, profileDescription});

//валидация 
export const formEditProfileValidator = new FormValidator(config, formEditProfile);
export const formAddImageValidator = new FormValidator(config, formAddImage);
export const formEditAvatarValidator = new FormValidator(config, formForEditAvatar);

formEditProfileValidator.enableValidation();
formAddImageValidator.enableValidation();
formEditAvatarValidator.enableValidation();

//создание карточки уже новой, не из массива. Получает данные  - название и ссылку
const createCard = (data) => {
  const card = new Card({data, handleCardClick, openPopupForConfirm},'.card-template'); //создаём экземпляр карточки
  const cardElement = card.generateCard(); //создаём карточку, заполняем ее с помощью метода (название и ссылку) и возвращаем ее
  return cardElement;
};

// renderer - функция которая описывает логику создания новой карточки,т.е функция, которая принимает данные,
// необходимые для создания карточки, затем внутри себя создает ее и добавляет в список через публичный метод этого списка 
// функция не должна ничего возвращать, а просто создает карточку и добавляет в список
function renderCard(cardData) {
  const cardElement = createCard(cardData); // div DOM
  section.addItem(cardElement);// 6 карточек из нашего массива
};

// Функции добавления информации пользователя и добавления карточки в профиль
function addProfileInfo(userData) {
  userInfo.setUserInfo(userData);
  popupEditProfile.closePopup();
};

function addCardOnPage(data) {
  section.addItem(createCard(data));
  popupForAddCard.closePopup();// добавление новой карточки через форму
};


function editProfileAvatar() {
  popupForEditAvatar.closePopup();
};

function deleteAfterConfirm() {
  //console.log('1', cardElement);
  deleteCardElement();
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

 

section.renderItems();