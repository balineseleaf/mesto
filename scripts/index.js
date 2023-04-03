const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.editProfilePopup');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
const popupSubmitForm = document.querySelector('.popup__form');
const popupSubmitButton = document.querySelector('.popup__submit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementContainer = document.querySelector('.elements')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

editButton.addEventListener('click', () => {
  editProfilePopup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

editProfilePopupCloseButton.addEventListener('click', () => {
  editProfilePopup.classList.remove('popup_opened');
});

popupSubmitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
});

popupSubmitButton.addEventListener('click', () => {
  editProfilePopup.classList.remove('popup_opened');
});


///
const cardTemplate = document.getElementById('card');
const cardGrid = document.querySelector('.elements');
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.addImagePopup');
const addCardForm = addCardPopup.querySelector('.popup__form');
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close');
const cardPopup = document.querySelector('.cardPopup');
const closeCardPopupButton = cardPopup.querySelector('.popup__close');


const createCardElement = (cardData) => {
  const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
  const cardName = cardElement.querySelector('.element__caption');
  const cardImage = cardElement.querySelector('.element__image');

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector('.element__delete-card-button');
  const likeButton = cardElement.querySelector('.element__icon-like');

  const handleDelete = () => {
    cardElement.remove();
  }
  
  const handleLike = () => {
    likeButton.classList.toggle('element__icon-like_active')
  }

  deleteButton.addEventListener('click', handleDelete);
  likeButton.addEventListener('click', handleLike);


  cardImage.addEventListener('click', () => {
    const image = cardPopup.querySelector('.popup__image');
    const text = cardPopup.querySelector('.popup__image-text');
    image.src = cardData.link;
    text.textContent = cardData.name;
    openPopup(cardPopup);
  });

  closeCardPopupButton.addEventListener('click', () => {
    closePopup(cardPopup);
  });

    return cardElement;
  };

const renderCardElement = (cardElement) => {
  cardGrid.prepend(cardElement);
}

initialCards.forEach((card) => {
  const element = createCardElement(card);
  renderCardElement(element);
});

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});

const closeAddImagePopup = () => {
  addCardPopup.classList.remove("popup_opened");
};

addCardPopupCloseButton.addEventListener('click', closeAddImagePopup);

const handleAddCardSubmit = (event) => {
  event.preventDefault();

  const nameInput = addCardForm.querySelector('.popup__input_type_name');
  const linkImageInput = addCardForm.querySelector('.popup__input_type_photo-link');
  const name = nameInput.value;
  const link = linkImageInput.value; 

  const cardData = {
    name,
    link,
  }

  renderCardElement(createCardElement(cardData));
  closeAddImagePopup();
};

addCardForm.addEventListener('submit', handleAddCardSubmit);






  



