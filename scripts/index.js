//import {config} from "./validate.js";

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
const cardTemplate = document.getElementById('card');
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
const nameInputError = document.querySelector('.name-input-error');
const descriptionInputError = document.querySelector('.description-input-error');

//edit profile popup
buttonEditProfile.addEventListener('click', function() {
  //enableButton(config, popupSubmitButtonEditProfile);
  nameInput.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
  descriptionInput.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
  nameInputError.textContent = '';
  descriptionInputError.textContent = '';
  openPopup(profileEditPopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
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



// create element with <template> and js
const createCardElement = function(cardData) {
  const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
  // blocks inside div 'element'
  const cardName = cardElement.querySelector('.element__caption');
  const cardImage = cardElement.querySelector('.element__image');
  const deleteButton = cardElement.querySelector('.element__delete-card-button');
  const likeButton = cardElement.querySelector('.element__icon-like');

  //fill the content of the card with data from the array
  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // handle delete and icon-like buttons
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__icon-like_active')
  });

// big image popup after click
  cardImage.addEventListener('click', function() {
    image.src = cardData.link;
    text.textContent = cardData.name;
    image.alt = cardData.name;

    openPopup(cardPopup);
  });

  
  return cardElement;
};

cardClosePopupButton.addEventListener('click', () => {
  closePopup(cardPopup);
});

//insert an element before the closing tag section .elements
const renderCardElement = function(cardElement) {
  cardGrid.prepend(cardElement);
}
// get elements from array
initialCards.forEach((card) => {
  const element = createCardElement(card);
  renderCardElement(element);
});

// functions for opening and closing popups
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
  //disableButton(config, popupSubmitButtonAddCArd);

  openPopup(cardAddPopup);
});

// close addImagePopup
const closeAddImagePopup = () => {
  closePopup(cardAddPopup);
};

// close addcard popup form 
cardAddPopupCloseButton.addEventListener('click', closeAddImagePopup);


//form for creating new cards
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

  renderCardElement(createCardElement(cardData));
  closeAddImagePopup();
};
// submit form
cardAddForm.addEventListener('submit', handleAddCardSubmit);













  



