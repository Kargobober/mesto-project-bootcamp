/* Если создать переменную, хранящую просту строку с id, то catch ловит ошибку
"Cannot set property userId of #<Object> which has only a getter"
Но если перенести такую переменную в index.js, то всё работает. Однако данная переменная
используется также в модуле card.js. Потому недопустимо экспортировать её
из index.js (перекрестный импорт). Видимо это связано с babel, который
транспилит код в старую версию (может переводит на класс,
который имеет ограничение на перезапись свойства)*/
export let currentUser = {};

export const validationSettings = {
  inputSelector: '.form__item',
  buttonSelector: '.form__submit-button',
  formSelector: '.form',
  // ↓ Не селектор по классу, а сам класс ↓
  invalidTextClass: 'form__item_invalid',
}

export let cardForDeletion = {};
export const deletionPopup = document.getElementById('pop-up_deletion');
