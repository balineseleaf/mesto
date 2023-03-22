const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
const popupSubmitForm = document.querySelector('.popup__form');
const popupSubmitButton = document.querySelector('.popup__submit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const likeButton = document.querySelector('.element__icon-like');
const addButton = document.querySelector('.profile__add-button');
const elementContainer = document.querySelector('.elements')

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






  



