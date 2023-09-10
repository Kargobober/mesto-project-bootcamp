/* ИМПОРТЫ */
// Данный импорт работает только с Вебпаком
import '../pages/index.css';

import { initialCards, validationSettings } from './const.js';
import { createCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { disableButton, enableValidation, hideError } from './validate.js';
import { getProfileInfo, handleResponse, handleInvalidResponse, sendProfileInfo } from './api.js';



/* ПРИМЕЧАНИЯ */
// В данном документе подразумевается, что попап и модальное окно - одно и то же


/* -----Глобальные переменные----- */
const cards = document.querySelector('.elements__list');
const cardsButtonAdd = document.querySelector('.profile__add-button');
// Попап создания карточки
const cardsPopup = document.getElementById('pop-up_element');
const cardButtonSubmit = cardsPopup.querySelector(validationSettings.buttonSelector);
const cardsForm = document.forms['form-element'];
const cardName = cardsForm.querySelector('input[name="name"]');
const cardLink = cardsForm.querySelector('input[name="link"]');

const userSettings = {
  selectorButtonEdit: '.profile__edit-button',
  idPopup: 'pop-up_profile',
  selectorUserNameModal: 'input[name="name"]',
  selectorUserAboutModal: 'input[name="about"]',
  nameOfForm: 'form-profile',
  selectorUserName: '.profile__username',
  selectorUserAbout: '.profile__user-about',
  selectorErrorElement: '.form__error-text',
  selectorAvatar: '.profile__avatar',
}
const profileButtonEdit = document.querySelector(userSettings.selectorButtonEdit);
const profilePopup = document.getElementById(userSettings.idPopup);
const userNameModal = profilePopup.querySelector(userSettings.selectorUserNameModal);
const userAboutModal = profilePopup.querySelector(userSettings.selectorUserAboutModal);
// Поиск формы внутри коллекции форм документа
const profileForm = document.forms[userSettings.nameOfForm];
// Данные о пользователе со страницы (не из формы внутри модального окна)
const profileUserName = document.querySelector(userSettings.selectorUserName);
const profileAbout = document.querySelector(userSettings.selectorUserAbout);
const profileAvatarElement = document.querySelector(userSettings.selectorAvatar);


/* -----Функции----- */
function insertCard(item) {
  cards.prepend(item);
}

// Обновление данных профиля
function updateLocalProfile(name, about, avatar) {
  profileUserName.textContent = name;
  profileAbout.textContent = about;
  if (avatar === undefined) {} else {
    profileAvatarElement.src = avatar;
  }
}

// Обновление профиля данными от пользователя (из модального окна)
function saveProfile(evt) {
  evt.preventDefault();
  sendProfileInfo(userNameModal.value, userAboutModal.value)
  .then(handleResponse)
  .then((data) => {
    updateLocalProfile(data.name, data.about);
    closePopup(profilePopup);
  })
  .catch(handleInvalidResponse);
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

// Открывание редактора профиля
profileButtonEdit.addEventListener('click', function(evt) {
  userNameModal.value = profileUserName.textContent;
  userAboutModal.value = profileAbout.textContent;
  /* При открытии редактора профиля там уже правильные данные,
  т.к. неверные не могли отправиться при предыдущей валидации
  Значит, надо очищать тексты ошибок и стили инпутов */
  hideError(userNameModal, validationSettings);
  hideError(userAboutModal, validationSettings);
  openPopup(profilePopup);
});

// Сохранение в редакторе профиля
  // Вешаем слушателя не на кнопку, а на форму целиком!
profileForm.addEventListener('submit', saveProfile);
