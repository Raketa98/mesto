const popupBlock = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit-btn');
const userName = document.querySelector('.profile__name');
const userDesc = document.querySelector('.profile__desc');
const closePopup = document.querySelector('.popup__close');
const inputName = document.querySelector('.popup__input-name');
const inputDesc = document.querySelector('.popup__input-desc');
const formElement = document.querySelector('.popup__form');

openPopup.addEventListener('click', function() {
  popupBlock.classList.add('popup_opened');
})

closePopup.addEventListener('click', function() {
  popupBlock.classList.remove('popup_opened');
})

inputName.value = userName.textContent;
inputDesc.value = userDesc.textContent;

function handleFormSubmit(e) {
  e.preventDefault;

  userName.textContent = inputName.value;
  userDesc.textContent = inputDesc.value;
}

formElement.addEventListener('submit', handleFormSubmit);
