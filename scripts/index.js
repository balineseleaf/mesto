const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close');
const nameInput = profileEditPopup.querySelector('.popup__input_type_name');
const descriptionInput = profileEditPopup.querySelector('.popup__input_type_description');
const popupSubmitForm = document.querySelector('.popup__form');
const popupSubmitButton = document.querySelector('.popup__submit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementContainer = document.querySelector('.elements')

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
const linkImageInput = cardAddForm.querySelector('.popup__input_type_photo-link');

const initialCards = [
  {
    name: 'Песок',
    link: 'https://images.unsplash.com/photo-1680030062888-e691d5992056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Солнечный день',
    link: 'https://images.unsplash.com/photo-1679612423220-2e98a243d172?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Берег',
    link: 'https://images.unsplash.com/photo-1679421077038-b3e7ecfacfc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Дюны',
    link: 'https://images.unsplash.com/photo-1680176750034-8d11a2f71096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
  },
  {
    name: 'Южный пляж',
    link: 'https://images.unsplash.com/photo-1679612423147-bc5246818202?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  },
  {
    name: 'Жена',
    link: 'https://images.unsplash.com/photo-1679612423146-8c4babd5d25f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }
];

buttonEditProfile.addEventListener('click', () => {
  openPopup(profileEditPopup);

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

profileEditPopupCloseButton.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

popupSubmitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
});

popupSubmitButton.addEventListener('click', () => {
  closePopup(profileEditPopup);
});


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
    image.src = cardData.link;
    text.textContent = cardData.name;
    openPopup(cardPopup);
  });

  cardClosePopupButton.addEventListener('click', () => {
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

cardAddButton.addEventListener('click', () => {
  openPopup(cardAddPopup);
});

const closeAddImagePopup = () => {
  closePopup(cardAddPopup);
};

cardAddPopupCloseButton.addEventListener('click', closeAddImagePopup);

const handleAddCardSubmit = (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const link = linkImageInput.value; 
  const cardData = {
    name,
    link,
  }

  renderCardElement(createCardElement(cardData));
  closeAddImagePopup();
};

cardAddForm.addEventListener('submit', handleAddCardSubmit);






  



