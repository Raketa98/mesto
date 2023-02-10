const showInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}

const disabledButton = (buttonElement, inactiveButtonClass) => { 
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

const toggleButtonState = (formSubmitButtonElement, inactiveButtonClass, buttonState) => {
  if (buttonState) {
    disabledButton(formSubmitButtonElement, inactiveButtonClass);
  } else {
    enableButton(formSubmitButtonElement, inactiveButtonClass);
  }
}

const checkInputValidity = (inputElement, errorElement, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputErrorClass);
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(el => !el.validity.valid);
}

const handleFormInput = (
  e,
  form,
  inputErrorClass,
  formSubmitButtonElement, 
  inactiveButtonClass,
  inputList ) => {
  const inputElement = e.target;
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  const buttonState = hasInvalidInput(inputList);
  
  checkInputValidity(inputElement, errorElement, inputErrorClass);
  toggleButtonState(formSubmitButtonElement, inactiveButtonClass, buttonState);
}

const handleFormSubmit = (e) => {
  e.preventDefault();
}

const enableValidation = ({
  formSelector,
  inputSelector,
  inputErrorClass,
  submitButtonSelector,
  inactiveButtonClass }) => {
  const formList = document.querySelectorAll(formSelector);
  formList.forEach(form => {
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const formSubmitButtonElement = form.querySelector(submitButtonSelector);

    form.addEventListener('submit', handleFormSubmit)
    inputList.forEach(el => {
      el.addEventListener('input', (e) => handleFormInput(
        e,
        form,
        inputErrorClass,
        formSubmitButtonElement,
        inactiveButtonClass,
        inputList
      ));
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled'
});
