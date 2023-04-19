const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close');
const nameInput = profileEditPopup.querySelector('.popup__input_type_name');
const descriptionInput = profileEditPopup.querySelector('.popup__input_type_description');
const popupSubmitForm = document.querySelector('.popup__form');
const popupSubmitButton = document.querySelectorAll('.popup__submit');
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
const imageInputLink = cardAddForm.querySelector('.popup__input_type_photo-link');
const imageInputDescription = cardAddForm.querySelector('.popup__input_type_photo-link-name');
const popups = document.querySelectorAll('.popup');

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


//edit profile popup
buttonEditProfile.addEventListener('click', function() {
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

popupSubmitButton.forEach(function(button) {
  button.addEventListener('click', function() {
    closePopup(profileEditPopup);
  });
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
    openPopup(cardPopup);
  });

  cardClosePopupButton.addEventListener('click', () => {
    closePopup(cardPopup);
  });

    return cardElement;
  };

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


const openPopup = function(popup) {
  popup.classList.add('popup_opened');
}

const closePopup = function(popup) {
  imageInputLink.value = '';
  imageInputDescription.value = '';
  popup.classList.remove('popup_opened');
}

document.addEventListener('keydown', (event) => {
  const popup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popup)
  }
});

const arrOfPopups = [profileEditPopup, cardAddPopup, cardPopup];
arrOfPopups.forEach(function(popup) {
  popup.addEventListener("click", (evt) => {
    const popup = document.querySelector('.popup_opened');
    if (evt.currentTarget === evt.target) {
      closePopup(popup)
    }
  });
});


// open  popup by using ButtonAddCard
cardAddButton.addEventListener('click', () => {
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

  if (name == '') {
    name = 'Красивое изображение';
  }
  const link = imageInputLink.value; 
  const cardData = {
    name,
    link,
  }

  disableButton(popupSubmitButton[1]);
  renderCardElement(createCardElement(cardData));
  closeAddImagePopup();
};
// submit form
cardAddForm.addEventListener('submit', handleAddCardSubmit);













  



