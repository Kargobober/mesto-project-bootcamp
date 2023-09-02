/* ИМПОРТЫ */
// Данный импорт работает только с Вебпаком
import '../pages/index.css';

import { initialCards } from './const';
import { createCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { disableButton, enableValidation } from './validate.js'



/* ПРИМЕЧАНИЯ */
// В данном документе подразумевается, что попап и модальное окно - одно и то же



/* -----Глобальные переменные----- */
const validationSettings = {
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

const profileButtonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.getElementById('pop-up_profile');
const userNameModal = profilePopup.querySelector('input[name="name"]');
const userAboutModal = profilePopup.querySelector('input[name="about"]');
// Поиск формы внутри коллекции форм документа
const profileForm = document.forms['form-profile'];
// Данные о пользователе со страницы (не из формы внутри модального окна)
const profileUsername = document.querySelector('.profile__username');
const profileAbout = document.querySelector('.profile__user-about');
const profileErrorElements = profileForm.querySelectorAll('.form__error-text');




/* -----Функции----- */
function insertCard(item) {
  cards.prepend(item);
}

function saveProfile(evt) {
  evt.preventDefault();
  profileUsername.textContent = userNameModal.value;
  profileAbout.textContent = userAboutModal.value;
  closePopup(profilePopup);
}



/* -----Логика----- */
// Динамическое создание карточек из массива
initialCards.forEach(item => {
  const newCard = createCard(item.name, item.link);
  insertCard(newCard);
});

enableValidation(validationSettings);



/* -----Обработчики событий----- */
// Нажатие на редактирование профиля
profileButtonEdit.addEventListener('click', function(evt) {
  userNameModal.value = profileUsername.textContent;
  userAboutModal.value = profileAbout.textContent;
  /* При открытии редактора профиля там уже правильные данные,
  т.к. неверные не могли отправиться при предыдущей валидации
  Значит, надо очищать тексты ошибок и стили инпутов */
  userNameModal.classList.remove(validationSettings.invalidTextClass);
  userAboutModal.classList.remove(validationSettings.invalidTextClass);
  profileErrorElements.forEach(errorElement => errorElement.textContent = '');
  openPopup(profilePopup);
});

// Сохранение в редакторе профиля
// Вешаем слушателя не на кнопку, а на форму целиком!
profileForm.addEventListener('submit', saveProfile);

// Нажатие на плюсик - создать карточку
cardsButtonAdd.addEventListener('click', evt => openPopup(cardsPopup));

// Сохранение в редакторе карточки - создать карточку
cardsForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = createCard(cardName.value, cardLink.value);
  insertCard(newCard);
  closePopup(cardsPopup);
  // Очищаем форму, которая и есть цель события
  evt.target.reset();
  disableButton(cardButtonSubmit);
});
