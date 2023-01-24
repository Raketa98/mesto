// блок редактирования
const popupBlock = document.querySelector('.popup');
const btnEdit = document.querySelector('.profile__edit-btn');
const userName = document.querySelector('.profile__name');
const userDesc = document.querySelector('.profile__desc');
const btnClose = document.querySelector('.popup__close');
const inputName = document.querySelector('.popup__input_type_name');
const inputDesc = document.querySelector('.popup__input_type_desc');
// блок добаления
const popupBlockAdd = document.querySelector('.popup-add');
const btnAdd = document.querySelector('.profile__add-btn');
const placeTitle = document.querySelector('.elements__title');
const placeLink = document.querySelector('.elements__img');
const btnAddClose = document.querySelector('.popup-add__close');
const inputPlace = document.querySelector('.popup-add__input_type_place');
const inputLink = document.querySelector('.popup-add__input_type_link');
// формы
const formElement = document.querySelector('.popup__form');
const formAddElement = document.querySelector('.popup-add__form');
// контейнер для шаблона
const elementsContainer = document.querySelector('.elements__list');

function openPopup(e) {
  e.preventDefault();
  popupBlock.classList.add('popup_opened');
  inputName.value = userName.textContent;
  inputDesc.value = userDesc.textContent;
}
btnEdit.addEventListener('click', openPopup);

function closePopup() {
  popupBlock.classList.remove('popup_opened');
}
btnClose.addEventListener('click', closePopup);

function handleFormSubmit(e) {
  e.preventDefault;

  userName.textContent = inputName.value;
  userDesc.textContent = inputDesc.value;

  closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);

function openPopupAdd(e) {
  e.preventDefault();

  popupBlockAdd.classList.add('popup-add_opened');

  inputPlace.value = '';
  inputLink.value = '';
}
btnAdd.addEventListener('click', openPopupAdd);

function closePopupAdd() {
  popupBlockAdd.classList.remove('popup-add_opened');
}
btnAddClose.addEventListener('click', closePopupAdd);

function handleFormSubmitAdd(e) {
  e.preventDefault;

  const elementsTemplate = document.querySelector('#elements-template').content;
  const cardElement = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  
  cardElement.querySelector('.elements__img').src = inputLink.value;
  cardElement.querySelector('.elements__img').alt = inputPlace.value;
  cardElement.querySelector('.elements__title').textContent = inputPlace.value;

  cardElement.querySelector('.elements__like-btn').addEventListener('click', function(e) {
    e.target.classList.toggle('elements__like-btn_active');
  })

  cardElement.querySelector('.elements__delete-btn').addEventListener('click', function(e) {
    e.target.closest('.elements__item').remove();
  })

  elementsContainer.prepend(cardElement);

  closePopupAdd();
}
formAddElement.addEventListener('submit', handleFormSubmitAdd);
// массив изображений, создание карточек по шаблону, отображение и удаление на странице
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

function createCards(val) {
  const elementsTemplate = document.querySelector('#elements-template').content;
  const cardElement = elementsTemplate.querySelector('.elements__item').cloneNode(true);

  cardElement.querySelector('.elements__img').src = val.link;
  cardElement.querySelector('.elements__img').alt = val.name;
  cardElement.querySelector('.elements__title').textContent = val.name;

  cardElement.querySelector('.elements__like-btn').addEventListener('click', function(e) {
    e.target.classList.toggle('elements__like-btn_active');
  })

  cardElement.querySelector('.elements__delete-btn').addEventListener('click', function(e) {
    e.target.closest('.elements__item').remove();
  })

  return cardElement;
}

initialCards.forEach(el => {
  elementsContainer.prepend(createCards(el));
})
