export class Card {
  constructor(
    data,
    templateSelector,
    popupBlockImg,
    openBigImage,
    openPopup,
    closePopup,
    handleLikeButton,
    handDeleteCard) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._popupBlockImg = popupBlockImg
    this._openBigImage = openBigImage;
    this._openPopup = openPopup;
    this._closePopup = closePopup;
    this._handleLikeButton = handleLikeButton;
    this._handDeleteCard = handDeleteCard;
  }

  _getTemplate() {
    const templateCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
    
    return templateCard;
  }

  _setEventListener(cardImg) {
    cardImg.addEventListener('click', e => {
      this._openPopup(this._popupBlockImg);
      this._openBigImage(e);
    });

    this._element.querySelector('.elements__like-btn').addEventListener('click', this._handleLikeButton);
    this._element.querySelector('.elements__delete-btn').addEventListener('click', this._handDeleteCard);
  }

  generateCard() {
    this._element = this._getTemplate();

    const elementImg = this._element.querySelector('.elements__img');
    elementImg.src = this._link;
    elementImg.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._setEventListener(elementImg);

    return this._element;
  }
}
