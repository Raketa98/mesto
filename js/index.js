import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, config } from "./constants.js";
// блок редактирования
const popupBlockEdit = document.querySelector('.popup_type_edit');
const btnEdit = document.querySelector('.profile__edit-btn');
const userNameProfile = document.querySelector('.profile__name');
const userDescProfile = document.querySelector('.profile__desc');
const inputNameProfile = popupBlockEdit.querySelector('.popup__input_type_name');
const inputDescProfile = popupBlockEdit.querySelector('.popup__input_type_desc');
const btnPopupEditSave = popupBlockEdit.querySelector('.popup__btn');
// блок добаления
const popupBlockAdd = document.querySelector('.popup_type_add');
const btnAdd = document.querySelector('.profile__add-btn');
const inputPlace = popupBlockAdd.querySelector('.popup__input_type_place');
const inputLink = popupBlockAdd.querySelector('.popup__input_type_link');
const btnPopupAddCreate = popupBlockAdd.querySelector('.popup__btn');
// формы
const formEditElement = document.querySelector('.popup__form-edit');
const formAddElement = document.querySelector('.popup__form-add');
// контейнер для шаблона
const elementsContainer = document.querySelector('.elements__list');
// блок картинки
const popupBlockImage = document.querySelector('.popup_type_image');
const popupImgElementImage = popupBlockImage.querySelector('.popup__image-img');
const popupImgElementTitle = popupBlockImage.querySelector('.popup__title-img');
// все попапы
const popups = document.querySelectorAll('.popup');
// // все крестики
// const closeButtonsPopup = document.querySelectorAll('.popup__close');
// экземпляры класса FormValidator для каждой формы
const formAddValidator = new FormValidator(config, formAddElement);
const formEditValidator = new FormValidator(config, formEditElement);

formAddValidator.enableValidation();
formEditValidator.enableValidation();

// две общие функции открытия и закрытия модальных окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup);
  // popup.addEventListener('click', closeOverlayPopup);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup);
  // popup.removeEventListener('click', closeOverlayPopup);
}

// функция закрытие попапа Esc
function closeEscPopup(e) {
  if (e.key === 'Escape') {
    const selectorPopupOpened = document.querySelector('.popup_opened');
    closePopup(selectorPopupOpened);
  }
}

// // функция закрытие попапа overlay
// function closeOverlayPopup(e) {
//   if (e.target === this) {
//     closePopup(e.target);
//   }
// }

// функция открытия попапа с картинкой
function openBigImage(name, link) {
  popupImgElementImage.src = link;
  popupImgElementImage.alt = name;
  popupImgElementTitle.textContent = name;

  openPopup(popupBlockImage);
}

// функция формы редактирования
function handleFormProfile() {
  inputNameProfile.value = userNameProfile.textContent;
  inputDescProfile.value = userDescProfile.textContent;

  formEditValidator.removeErrors();
  formEditValidator.enableButton();

  openPopup(popupBlockEdit);
}

// функция формы добавления
function handleFormAdd() {
  formAddElement.reset();
  formAddValidator.removeErrors();
  formAddValidator.disableButton();

  openPopup(popupBlockAdd);
}

function createCardElement(el) {
  const card = new Card(
    el,
    '#elements-template',
    popupBlockImage, 
    openBigImage,
    openPopup,
    closePopup
    );
  const newCard = card.generateCard();

  return newCard;
}

// функция сохранения изменений при закрытии формы редактирования
function handleFormSubmitEdit(e) {
  e.preventDefault;

  userNameProfile.textContent = inputNameProfile.value;
  userDescProfile.textContent = inputDescProfile.value;
  
  closePopup(popupBlockEdit);
}

// функция добавления карточки в список
function handleFormSubmitAdd(e) {
  e.preventDefault;

  const newCard = createCardElement({
    name: inputPlace.value,
    link: inputLink.value
  });
  elementsContainer.prepend(newCard);

  closePopup(popupBlockAdd);
}

// открытие формы редактирования 
btnEdit.addEventListener('click', handleFormProfile);

// открытие формы добавления
btnAdd.addEventListener('click', handleFormAdd);

// добавление изменений по кнопке сохранить
formEditElement.addEventListener('submit', handleFormSubmitEdit);

// добавление по кнопке создать
formAddElement.addEventListener('submit', handleFormSubmitAdd);

// // закрытие крестиком любого количества попапов
// closeButtonsPopup.forEach(el => {
//   const popup = el.closest('.popup');
//   el.addEventListener('click', function() {
//     closePopup(popup)
//   })
// })

// закрытие крестиком и оверлеем
popups.forEach(el => {
  el.addEventListener('mousedown', e => {
    if (e.target.classList.contains('popup_opened')) { // проверка на вложенность
      closePopup(el);
    } 
    else if (e.target.classList.contains('popup__close')) {
      closePopup(el);
    }
  })
})

initialCards.forEach(el => {
  const cardList = createCardElement(el);
  elementsContainer.prepend(cardList);
})
