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
const popupBlockImg = document.querySelector('.popup_type_image');
const popupImgElementImage = popupBlockImg.querySelector('.popup__image-img');
const popupImgElementTitle = popupBlockImg.querySelector('.popup__title-img');
// все попапы
const popups = document.querySelectorAll('.popup');
// // все крестики
// const closeButtonsPopup = document.querySelectorAll('.popup__close');
// экземпляры класса FormValidator для каждой формы
const formAddValidator = new FormValidator(config, formAddElement);
const formEditValidator = new FormValidator(config, formEditElement);

formAddValidator.enableValidation(config, formAddElement);
formEditValidator.enableValidation(config, formEditElement);

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

// функция удаления карточки
function handleDeleteCard (e) {
  e.target.closest('.elements__item').remove();
}

// функция поставить лайк
function handleLikeButton (e) {
  e.target.classList.toggle('elements__like-btn_active');
}

// функция открытия попапа с картинкой
export function openBigImage(el) {
  popupImgElementImage.src = el.target.src;
  popupImgElementImage.alt = el.target.alt;
  popupImgElementTitle.textContent = el.target.alt;

  openPopup(popupBlockImg);
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

  // elementsContainer.prepend(createCards({
  //   name: inputPlace.value,
  //   link: inputLink.value
  // }));
  const card = new Card({
    name: inputPlace.value,
    link: inputLink.value
  },
  '#elements-template',
  popupBlockImg,
  openBigImage,
  openPopup,
  closePopup,
  handleLikeButton,
  handleDeleteCard
  );

  const newCard = card.generateCard();
  elementsContainer.prepend(newCard);

  closePopup(popupBlockAdd);
}

// // функция создания новой карточки
// function createCards(el) {
//   const elementsTemplate = document.querySelector('#elements-template').content;
//   const cardElement = elementsTemplate.querySelector('.elements__item').cloneNode(true);
//   const elementImg = cardElement.querySelector('.elements__img');
  
//   elementImg.src = el.link;
//   elementImg.alt = el.name;
//   cardElement.querySelector('.elements__title').textContent = el.name;

//   cardElement.querySelector('.elements__like-btn').addEventListener('click', putLike);

//   cardElement.querySelector('.elements__delete-btn').addEventListener('click', deleteCard);

//   elementImg.addEventListener('click', openBigImage);
  
//   return cardElement;
// }

// открытие формы редактирования 
btnEdit.addEventListener('click', function(e) {
  e.preventDefault();

  inputNameProfile.value = userNameProfile.textContent;
  inputDescProfile.value = userDescProfile.textContent;

  formEditValidator.removeErrors(formEditElement, config.inputSelector, config.inputErrorClass);
  formEditValidator.enableButton(btnPopupEditSave, config.inactiveButtonClass);

  openPopup(popupBlockEdit);
});

// открытие формы добавления
btnAdd.addEventListener('click', function(e) {
  e.preventDefault();

  formAddElement.reset();
  formAddValidator.removeErrors(formAddElement, config.inputSelector, config.inputErrorClass);
  formAddValidator.disableButton(btnPopupAddCreate, config.inactiveButtonClass);

  openPopup(popupBlockAdd);
});

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

// // отрисовка карточек
// initialCards.forEach(el => {
//   elementsContainer.prepend(createCards(el));
// });

initialCards.forEach(el => {
  const card = new Card(
    el,
    '#elements-template',
    popupBlockImg,
    openBigImage,
    openPopup,
    closePopup, 
    handleLikeButton,
    handleDeleteCard
  );
  
  const cardList = card.generateCard();
  elementsContainer.prepend(cardList);
})
