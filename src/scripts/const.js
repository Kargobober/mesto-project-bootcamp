export const validationSettings = {
  inputSelector: '.form__item',
  buttonSelector: '.form__submit-button',
  formSelector: '.form',
  // ↓ Не селектор по классу, а сам класс ↓
  invalidTextClass: 'form__item_invalid',
}

export let cardForDeletion = {};
export const deletionPopup = document.getElementById('pop-up_deletion');
