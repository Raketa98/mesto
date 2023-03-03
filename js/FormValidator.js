export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._formElement = formElement;
  }

  removeErrors = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    inputList.forEach(el => {
      const errorElement = formElement.querySelector(`.${el.id}-error`);
      this._hideInputError(el, errorElement);
    })
  }

  disableButton = (buttonElement) => { 
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }
  
  enableButton = (buttonElement) => {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _showInputError = (inputElement, errorElement) => {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  _hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }
  
  _toggleButtonState = (formSubmitButtonElement, buttonState) => {
    if (buttonState) {
      this.disableButton(formSubmitButtonElement);
    } else {
      this.enableButton(formSubmitButtonElement);
    }
  }
  
  _checkInputValidity = (inputElement, errorElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }
  
  _hasInvalidInput = (inputList) => {
    return inputList.some(el => !el.validity.valid);
  }
  
  _handleFormInput = (
    e,
    formElement,
    formSubmitButtonElement,
    inputList) => {
    const inputElement = e.target;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const buttonState = this._hasInvalidInput(inputList);
    
    this._checkInputValidity(inputElement, errorElement);
    this._toggleButtonState(formSubmitButtonElement, buttonState);
  }

  _handleFormSubmit = (e) => {
    e.preventDefault();
  }
  
  enableValidation = () => {
    const formSubmitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._formElement.addEventListener('submit', this._handleFormSubmit);
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', e => this._handleFormInput(
        e,
        this._formElement,
        formSubmitButtonElement,
        inputList));
      })
  }
}
