import { initialCards, config} from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close');
const nameInput = profileEditPopup.querySelector('.popup__input_type_name');
const descriptionInput = profileEditPopup.querySelector('.popup__input_type_description');
const popupSubmitForm = document.querySelector('.popup__form');
const popupSubmitButton = document.querySelector('.popup__submit'); //All
const popupSubmitButtonEditProfile = document.querySelector('.popup__submitEditProfile'); //All
const popupSubmitButtonAddCArd = document.querySelector('.popup__submitAddCard');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardGrid = document.querySelector('.elements');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_card-add');
const cardAddForm = cardAddPopup.querySelector('.popup__form');
const cardAddPopupCloseButton = cardAddPopup.querySelector('.popup__close');
const cardPopup = document.querySelector('.popup_type_picture');
const cardClosePopupButton = cardPopup.querySelector('.popup__close');
const image = cardPopup.querySelector('.popup__image');
const text = cardPopup.querySelector('.popup__image-text');
const imageInputLink = cardAddForm.querySelector('.popup__input_type_photo-link');
const imageInputDescription = cardAddForm.querySelector('.popup__input_type_photo-link-name');
const placeNameInputError = document.querySelector('.placeName-input-error');
const linkInputError = document.querySelector('.link-input-error');
const formEditProfile = document.querySelector('.popup__form_edit-profile');
const formAddImage = document.querySelector('.popup__form_add-image');


export const openBigImage = (name, link) => {
  openPopup(cardPopup);
  image.src  = link;
  image.alt = name;
  text.textContent = name;
};

//создание карточки 
const createCard = (item) => {
  const card = new Card(item, '.card-template', '.card-template_type_default', openBigImage); //создаём экземпляр карточки
  const cardElement = card.generateCard(); //создаём карточку и возвращаем её на страницу
  return cardElement;
};

const renderCardElement = function(cardElement) {
  cardGrid.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCardElement(createCard(card));
});

const handleAddCardSubmit = (event) => {
  event.preventDefault();
  let name = imageInputDescription.value;
  if (name === '') {
    name = 'Красивое изображение';
  }
  const link = imageInputLink.value; 
  const cardData = {
    name,
    link,
  }

  renderCardElement(createCard({name, link}));
  closeAddImagePopup();
};

//edit profile popup
buttonEditProfile.addEventListener('click', function() {
  openPopup(profileEditPopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popupSubmitButtonEditProfile.classList.remove('popup__submit_inactive');
  
});

popupSubmitForm.addEventListener('submit', function(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
});

profileEditPopupCloseButton.addEventListener('click', function() {
  closePopup(profileEditPopup);
});

popupSubmitButton.addEventListener('click', function() {
  closePopup(profileEditPopup);
});

cardClosePopupButton.addEventListener('click', () => {
  closePopup(cardPopup);
});

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const closeByOverlay = () => {
  const popupList = [profileEditPopup, cardAddPopup, cardPopup];
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', function (evt) {
      if (evt.currentTarget === evt.target) {
        closePopup(popupElement);
      }
    });
  });
};

closeByOverlay();

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);

}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}


// open  popup by using ButtonAddCard
cardAddButton.addEventListener('click', () => {
  imageInputLink.value = '';
  imageInputDescription.value = '';
  placeNameInputError.textContent = '';
  linkInputError.textContent = '';
  popupSubmitButtonAddCArd.classList.add('popup__submit_inactive');
  openPopup(cardAddPopup);
});

const closeAddImagePopup = () => {
  closePopup(cardAddPopup);
};

cardAddPopupCloseButton.addEventListener('click', closeAddImagePopup);

cardAddForm.addEventListener('submit', handleAddCardSubmit);

const formEditProfileValidator = new FormValidator(config, formEditProfile);
const formAddImageValidator = new FormValidator(config, formAddImage);
formEditProfileValidator.enableValidation();
formAddImageValidator.enableValidation();












  



