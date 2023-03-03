export class Card {
  constructor(
    data,
    templateSelector,
    popupBlockImg,
    openBigImage,
    openPopup,
    closePopup
    ) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._popupBlockImg = popupBlockImg
    this._openBigImage = openBigImage;
    this._openPopup = openPopup;
    this._closePopup = closePopup;
  }

  // функция удаления карточки
  _handleDeleteCard (e) {
    e.target.closest('.elements__item').remove();
  }

  // функция поставить лайк
  _handleLikeButton (e) {
    e.target.classList.toggle('elements__like-btn_active');
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
    cardImg.addEventListener('click', () => {
      this._openPopup(this._popupBlockImg);
      this._openBigImage(this._name, this._link);
    });

    this._element.querySelector('.elements__like-btn').addEventListener('click', this._handleLikeButton);
    this._element.querySelector('.elements__delete-btn').addEventListener('click', this._handleDeleteCard);
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
