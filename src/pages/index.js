import { initialCards, config} from '../scripts/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'  
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css' // подключение css

const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
//const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close');
export const nameInput = profileEditPopup.querySelector('.popup__input_type_name');
export const descriptionInput = profileEditPopup.querySelector('.popup__input_type_description');
//const popupSubmitForm = document.querySelector('.popup__form');
//const popupSubmitButton = document.querySelector('.popup__submit'); //All
const popupSubmitButtonEditProfile = document.querySelector('.popup__submitEditProfile'); //All
const popupSubmitButtonAddCArd = document.querySelector('.popup__submitAddCard');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//const cardGrid = document.querySelector('.elements');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_card-add');
const cardAddForm = cardAddPopup.querySelector('.popup__form');
//const cardAddPopupCloseButton = cardAddPopup.querySelector('.popup__close');
const cardPopup = document.querySelector('.popup_type_picture');
//const cardClosePopupButton = cardPopup.querySelector('.popup__close');
export const image = cardPopup.querySelector('.popup__image');
export const text = cardPopup.querySelector('.popup__image-text');
//const imageInputLink = cardAddForm.querySelector('.popup__input_type_photo-link');
//const imageInputDescription = cardAddForm.querySelector('.popup__input_type_photo-link-name');
export const formEditProfile = document.querySelector('.popup__form_edit-profile');
export const formAddImage = document.querySelector('.popup__form_add-image');

const section = new Section({items: initialCards, renderer: renderCard }, '.elements');

// для каждого попапа с формами  создаем свой экземпляр класса PopupWithForm
// создаем два экземпляра класса PopupWithForm, в каждый передаем свой коллбек (помимо селектора попапа)
const popupEditProfile = new PopupWithForm(profileEditPopup, AddProfileInfo);
popupEditProfile.setEventListeners();

const popupForAddCard = new PopupWithForm(cardAddPopup, AddCardOnPage);
popupForAddCard.setEventListeners();

export const popupBigImage = new PopupWithImage(cardPopup);
popupBigImage.setEventListeners();

const userInfo = new UserInfo({profileName, profileDescription});

//валидация 
export const formEditProfileValidator = new FormValidator(config, formEditProfile);
export const formAddImageValidator = new FormValidator(config, formAddImage);
formEditProfileValidator.enableValidation();
formAddImageValidator.enableValidation();

//создание карточки уже новой, не из массива. Получает данные  - название и ссылку
const createCard = (data) => {
  const card = new Card({data, handleCardClick},  '.card-template', '.card-template_type_default'); //создаём экземпляр карточки
  const cardElement = card.generateCard(); //создаём карточку, заполняем ее с помощью метода (название и ссылку) и возвращаем ее
  return cardElement;
};

// renderer - функция которая описывает логику создания новой карточки,т.е функция, которая принимает данные,
// необходимые для создания карточки, затем внутри себя создает ее и добавляет в список через публичный метод этого списка 
// функция не должна ничего возвращать, а просто создает карточку и добавляет в список
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};

// Функции добавления информации пользователя и добавления карточки в профиль
function AddProfileInfo(userData) {
  userInfo.setUserInfo(userData);
  popupEditProfile.closePopup();
};

function AddCardOnPage(data) {
  console.log('в функции addCardOnPage в индексе', data)
  section.addItem(createCard(data));
  popupForAddCard.closePopup();
};

// Функция клика по изображению
function handleCardClick(name, link) {
  popupBigImage.openPopup(name, link);
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

section.renderItems();