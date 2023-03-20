const editButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup__edit-profile");
const editProfilePopupCloseButton = editProfilePopup.querySelector(".popup__close");
const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
const descriptionInput = editProfilePopup.querySelector(".popup__input_type_description");

const popupSubmitForm = document.querySelector(".popup__form");
const popupSubmitButton = document.querySelector(".popup__submit");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const likeButton = document.querySelector(".element__icon-like");

const addButton = document.querySelector(".profile__add-button");
const elementContainer = document.querySelector(".elements")



editButton.addEventListener('click', () => {
  editProfilePopup.classList.add('popup_open');

  nameInput.value = profileName.innerHTML;
  descriptionInput.value = profileDescription.innerHTML;
})

editProfilePopupCloseButton.addEventListener('click', () => {
  editProfilePopup.classList.remove('popup_open');
})

popupSubmitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.innerHTML = nameInput.value;
  profileDescription.innerHTML = descriptionInput.value;
});

popupSubmitButton.addEventListener('click', () => {
  editProfilePopup.classList.remove('popup_open');
});

addButton.addEventListener('click', () => {
  elementContainer.insertAdjacentHTML('beforeend',           
         `<div class="element">
            <div class="element__block">
            <img
              class="element__image"
              src="images/image1.png"
              alt="Фотография природы"
            />
            <div class="element__caption-block">
              <p class="element__caption">Карачаевск</p>
               <img
                 class="element__icon-like element__icon-like_active"
                 src="images/icon-like.png"
                 alt="сердечко"
               />
             </div>
            </div>
          </div>`);
});




  



