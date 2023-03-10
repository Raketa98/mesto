export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._formElement = formElement;
    this._formSubmitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  removeErrors = () => {
    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    })
  }

  disableButton = () => { 
    this._formSubmitButtonElement.classList.add(this._inactiveButtonClass);
    this._formSubmitButtonElement.disabled = true;
  }
  
  _enableButton = () => {
    this._formSubmitButtonElement.classList.remove(this._inactiveButtonClass);
    this._formSubmitButtonElement.disabled = false;
  }

  _showInputError = (inputElement, errorElement) => {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  _hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }
  
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }
  
  _checkInputValidity = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }
  
  _hasInvalidInput = () => {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }
  
  _handleFormInput = () => {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    });
  }
  
  enableValidation = () => {
    this._handleFormInput();
  }
}
