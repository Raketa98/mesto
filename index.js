const popupBlock = document.querySelector('.popup');
const btnEdit = document.querySelector('.profile__edit-btn');
const userName = document.querySelector('.profile__name');
const userDesc = document.querySelector('.profile__desc');
const btnClose = document.querySelector('.popup__close');
const inputName = document.querySelector('.popup__input-name');
const inputDesc = document.querySelector('.popup__input-desc');
const formElement = document.querySelector('.popup__form');

const openPopup = function() {
  popupBlock.classList.add('popup_opened');
  inputName.value = userName.textContent;
  inputDesc.value = userDesc.textContent;
}
btnEdit.addEventListener('click', openPopup)

const closePopup = function() {
  popupBlock.classList.remove('popup_opened');
}
btnClose.addEventListener('click', closePopup)

function handleFormSubmit(e) {
  e.preventDefault;

  userName.textContent = inputName.value;
  userDesc.textContent = inputDesc.value;

  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
