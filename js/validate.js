const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled'
};

const showInputError = (inputElement, errorElement, config) => {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (inputElement, errorElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

const disableButton = (buttonElement, config) => { 
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
}

const disableButtonAtFirst = (buttonElement, config) => { 
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

const enableButtonAtFirst = (buttonElement, config) => { 
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

const removeErrors = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(el => {
    const errorElement = form.querySelector(`.${el.id}-error`);
    hideInputError(el, errorElement, config);
  })
}

const toggleButtonState = (formSubmitButtonElement, config, buttonState) => {
  if (buttonState) {
    disableButton(formSubmitButtonElement, config);
  } else {
    enableButton(formSubmitButtonElement, config);
  }
}

const checkInputValidity = (inputElement, errorElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, config);
  } else {
    hideInputError(inputElement, errorElement, config);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(el => !el.validity.valid);
}

const handleFormInput = (e, form, config, formSubmitButtonElement, inputList) => {
  const inputElement = e.target;
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  const buttonState = hasInvalidInput(inputList);
  
  checkInputValidity(inputElement, errorElement, config);
  toggleButtonState(formSubmitButtonElement, config, buttonState);
}

const handleFormSubmit = (e) => {
  e.preventDefault();
}

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(form => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const formSubmitButtonElement = form.querySelector(config.submitButtonSelector);
    form.addEventListener('submit', handleFormSubmit);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', e => handleFormInput(e, form, config, formSubmitButtonElement, inputList));
    })
  })
}

enableValidation(config);
