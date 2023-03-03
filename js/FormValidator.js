export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._formElement = formElement;
  }

  removeErrors = (formElement, inputSelector, inputErrorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach(el => {
      const errorElement = formElement.querySelector(`.${el.id}-error`);
      this._hideInputError(el, errorElement, inputErrorClass);
    })
  }

  disableButton = (buttonElement, inactiveButtonClass) => { 
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
  
  enableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _showInputError = (inputElement, errorElement, inputErrorClass) => {
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  _hideInputError = (inputElement, errorElement, inputErrorClass) => {
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
  }
  
  _toggleButtonState = (formSubmitButtonElement, inactiveButtonClass, buttonState) => {
    if (buttonState) {
      this.disableButton(formSubmitButtonElement, inactiveButtonClass);
    } else {
      this.enableButton(formSubmitButtonElement, inactiveButtonClass);
    }
  }
  
  _checkInputValidity = (inputElement, errorElement, inputErrorClass) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputErrorClass);
    } else {
      this._hideInputError(inputElement, errorElement, inputErrorClass);
    }
  }
  
  _hasInvalidInput = (inputList) => {
    return inputList.some(el => !el.validity.valid);
  }
  
  _handleFormInput = (
    e,
    formElement,
    inputErrorClass,
    formSubmitButtonElement,
    inactiveButtonClass,
    inputList) => {
    const inputElement = e.target;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const buttonState = this._hasInvalidInput(inputList);
    
    this._checkInputValidity(inputElement, errorElement, inputErrorClass);
    this._toggleButtonState(formSubmitButtonElement, inactiveButtonClass, buttonState);
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
        this._inputErrorClass,
        formSubmitButtonElement,
        this._inactiveButtonClass,
        inputList));
      })
  }
}
