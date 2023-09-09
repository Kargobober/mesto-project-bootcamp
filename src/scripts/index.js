window.exports = window;
/* ИМПОРТЫ */
// Данный импорт работает только с Вебпаком
import '../pages/index.css';

import { initialCards } from './const.js';
import { createCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { disableButton, enableValidation } from './validate.js';
import { getProfileInfo, handleResponse, handleInvalidResponse } from './api.js';
import { updateLocalProfile } from './user.js';



/* ПРИМЕЧАНИЯ */
// В данном документе подразумевается, что попап и модальное окно - одно и то же


export const a = 5;
/* -----Глобальные переменные----- */
export const validationSettings = {
  inputSelector: '.form__item',
  buttonSelector: '.form__submit-button',
  formSelector: '.form',
  // ↓ Не селектор по классу, а сам класс ↓
  invalidTextClass: 'form__item_invalid',
}
const cards = document.querySelector('.elements__list');
const cardsButtonAdd = document.querySelector('.profile__add-button');
// Попап создания карточки
const cardsPopup = document.getElementById('pop-up_element');
const cardButtonSubmit = cardsPopup.querySelector(validationSettings.buttonSelector);
const cardsForm = document.forms['form-element'];
const cardName = cardsForm.querySelector('input[name="name"]');
const cardLink = cardsForm.querySelector('input[name="link"]');



/* -----Функции----- */
function insertCard(item) {
  cards.prepend(item);
}



/* -----Логика----- */
// Динамическое создание карточек из массива
initialCards.forEach(item => {
  const newCard = createCard(item.name, item.link);
  insertCard(newCard);
});

enableValidation(validationSettings);

getProfileInfo()
  .then(handleResponse)
  .then((data) => {
    updateLocalProfile(data.name, data.about, data.avatar);
  })
  .catch(handleInvalidResponse);



/* -----Обработчики событий----- */
// Нажатие на плюсик - создать карточку
cardsButtonAdd.addEventListener('click', evt => openPopup(cardsPopup));

// Сохранение в редакторе карточки - создать карточку
cardsForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = createCard(cardName.value, cardLink.value);
  insertCard(newCard);
  closePopup(cardsPopup);
  // Очищаем форму, которая и есть цель события
  evt.target.reset();
  disableButton(cardButtonSubmit);
});
