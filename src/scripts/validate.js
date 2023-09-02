function showError(input, errorText, settings) {
  const errorId = 'error-' + input.id;
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = errorText;
  input.classList.add(settings.invalidTextClass)
}

function hideError(input, settings) {
  const errorId = 'error-' + input.id;
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = '';
  input.classList.remove(settings.invalidTextClass)
}

function checkField(input, settings) {
  if (!input.validity.valid) {
    // Используем свойство validationMessage из "Constraint Validation API"(встроено в браузеры)
    showError(input, input.validationMessage, settings);
  } else {
    hideError(input, settings);
  }
}

function enableButton(button) {
  button.disabled = false;
}

export function disableButton(button) {
  button.disabled = true;
}

function checkButton(formElement, buttonSubmit) {
  if (formElement.checkValidity()) {
    enableButton(buttonSubmit);
  } else {
    disableButton(buttonSubmit);
  }
}

function setEventListeners(formElement, settings) {
  const buttonSubmit = formElement.querySelector(settings.buttonSelector);
  disableButton(buttonSubmit);
  const inputList = formElement.querySelectorAll(settings.inputSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkField(input, settings);
      checkButton(formElement, buttonSubmit);
    });
  });
}

export const enableValidation = function (settings) {
const formList = document.querySelectorAll(settings.formSelector);
formList.forEach((formElement) => {
  setEventListeners(formElement, settings);
});
}
