export class Card {
  constructor(data, templateSelector, openBigImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openBigImage = openBigImage;
  }
  
  // функция удаления карточки
  _handleDeleteCard () {
    // e.target.closest('.elements__item').remove();
    this._handleDelete.closest('.elements__item').remove();
  }
  
  // функция поставить лайк
  _handleLikeButton () {
    // e.target.classList.toggle('elements__like-btn_active');
    this._handleLike.classList.toggle('elements__like-btn_active');
  } 

  _getTemplate() {
    const templateCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
    
    return templateCard;
  }

  _setEventListener() {
    this._elementImage.addEventListener('click', () => {
      this._openBigImage(this._name, this._link);
    })

    this._handleLike.addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._handleDelete.addEventListener('click', () => {
      this._handleDeleteCard();
    }); 
  }

  generateCard() {
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector('.elements__img');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._handleLike = this._element.querySelector('.elements__like-btn');
    this._handleDelete = this._element.querySelector('.elements__delete-btn');
    this._setEventListener();

    return this._element;
  }
}
