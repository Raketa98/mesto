// блок редактирования
const popupBlockEdit = document.querySelector('.popup_type_edit');
const btnEdit = document.querySelector('.profile__edit-btn');
const userNameProfile = document.querySelector('.profile__name');
const userDescProfile = document.querySelector('.profile__desc');
const btnEditClose = popupBlockEdit.querySelector('.popup__close');
const inputNameProfile = document.querySelector('.popup__input_type_name');
const inputDescProfile = document.querySelector('.popup__input_type_desc');
const btnPopupEditSave = popupBlockEdit.querySelector('.popup__btn');
// блок добаления
const popupBlockAdd = document.querySelector('.popup_type_add');
const btnAdd = document.querySelector('.profile__add-btn');
const placeTitle = document.querySelector('.elements__title');
const placeLink = document.querySelector('.elements__img');
const btnAddClose = popupBlockAdd.querySelector('.popup__close');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const btnPopupAddCreate = popupBlockAdd.querySelector('.popup__btn');
// формы
const formEditElement = document.querySelector('.popup__form-edit');
const formAddElement = document.querySelector('.popup__form-add');
// контейнер для шаблона
const elementsContainer = document.querySelector('.elements__list');
// блок картинки
const popupBlockImg = document.querySelector('.popup_type_image');
const btnImgClose = document.querySelector('.popup__close-img');
const popupImgElementImage = document.querySelector('.popup__image-img');
const popupImgElementTitle = document.querySelector('.popup__title-img');
const elementsImg = document.querySelectorAll('.elements__img');

// две общие функции открытия и закрытия модальных окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup, {once: true});
  popup.addEventListener('click', closeOverlayPopup, {once: true});
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// функция закрытие попапа Esc
function closeEscPopup(e) {
  if (e.key === 'Escape') {
    const selectorPopupOpened = document.querySelector('.popup_opened');
    closePopup(selectorPopupOpened);
  }
}

// функция закрытие попапа overlay
function closeOverlayPopup(e) {
  if (e.target === this) {
    closePopup(e.target);
  }
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

  elementsContainer.prepend(createCards({
    name: inputPlace.value,
    link: inputLink.value
  }));

  closePopup(popupBlockAdd);
}

// функция создания новой карточки
function createCards(el) {
  const elementsTemplate = document.querySelector('#elements-template').content;
  const cardElement = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  const elementImg = cardElement.querySelector('.elements__img');
  
  elementImg.src = el.link;
  elementImg.alt = el.name;
  cardElement.querySelector('.elements__title').textContent = el.name;

  cardElement.querySelector('.elements__like-btn').addEventListener('click', function(e) {
    e.target.classList.toggle('elements__like-btn_active');
  });

  cardElement.querySelector('.elements__delete-btn').addEventListener('click', function(e) {
    e.target.closest('.elements__item').remove();
  });

  elementImg.addEventListener('click', openBigImage);
  
  return cardElement;
}

// функция открытия попапа с картинкой
function openBigImage(el) {
  popupImgElementImage.src = el.target.src;
  popupImgElementImage.alt = el.target.alt;
  popupImgElementTitle.textContent = el.target.alt;

  openPopup(popupBlockImg);
}

// открытие и закрытие формы редактирования по кнопке
btnEdit.addEventListener('click', function(e) {
  e.preventDefault();

  inputNameProfile.value = userNameProfile.textContent;
  inputDescProfile.value = userDescProfile.textContent;

  const emptyError = popupBlockEdit.querySelectorAll('.popup__input-error');
  emptyError.forEach(el => el.textContent = '');

  const emptyErrorLine = popupBlockEdit.querySelectorAll('.popup__input');
  emptyErrorLine.forEach(el => el.classList.remove('popup__input_type_error'));

  btnPopupEditSave.classList.remove('popup__btn_disabled');
  btnPopupEditSave.disabled = false;

  openPopup(popupBlockEdit);
});
btnEditClose.addEventListener('click', function() {
  closePopup(popupBlockEdit);
});

// добавление изменений по кнопке сохранить
formEditElement.addEventListener('submit', handleFormSubmitEdit);

// открытие и закрытие формы добавления
btnAdd.addEventListener('click', function(e) {
  e.preventDefault();

  // inputPlace.value = '';
  // inputLink.value = '';

  const emptyError = popupBlockAdd.querySelectorAll('.popup__input-error');
  emptyError.forEach(el => el.textContent = '');

  const emptyErrorLine = popupBlockAdd.querySelectorAll(".popup__input");
  emptyErrorLine.forEach(el => el.classList.remove("popup__input_type_error"));

  formAddElement.reset();

  btnPopupAddCreate.classList.add('popup__btn_disabled');
  btnPopupAddCreate.disabled = true;

  openPopup(popupBlockAdd);
});
btnAddClose.addEventListener('click', function() {
  closePopup(popupBlockAdd);
});

// добавление по кнопке создать
formAddElement.addEventListener('submit', handleFormSubmitAdd);

// закрытие попапа с картинкой
btnImgClose.addEventListener('click', function() {
  closePopup(popupBlockImg);
});

// отрисовка карточек
initialCards.forEach(el => {
  elementsContainer.prepend(createCards(el));
});
