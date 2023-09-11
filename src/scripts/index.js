/* ИМПОРТЫ */
// Данный импорт работает только с Вебпаком
import '../pages/index.css';

import { validationSettings } from './const.js';
import { createCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { disableButton, enableValidation, hideError } from './validate.js';
import { getProfileInfo, handleResponse, handleInvalidResponse, sendProfileInfo, sendProfileAvatar, getCards, sendCard } from './api.js';



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

const profileButtonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.getElementById('pop-up_profile');
const userNameModal = profilePopup.querySelector('input[name="name"]');
const userAboutModal = profilePopup.querySelector('input[name="about"]');
// Поиск формы внутри коллекции форм документа
const profileForm = document.forms['form-profile'];
// Данные о пользователе со страницы (не из формы внутри модального окна)
const profileUserName = document.querySelector('.profile__username');
const profileAbout = document.querySelector('.profile__user-about');
const profileAvatarContainer = document.querySelector('.profile__avatar-container');
const profileAvatarElement = document.querySelector('.profile__avatar');
const profileAvatarPopup = document.getElementById('pop-up_avatar');
const profileAvatarForm = document.forms['form-avatar'];
// Ниже сохраняю в переменную тег input, в который вносят ссылку на картинку аватарки
const profileAvatarLinkModal = profileAvatarForm.elements['avatar-link'];

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

enableValidation(validationSettings);

getProfileInfo()
  .then(handleResponse)
  .then((data) => {
    updateLocalProfile(data.name, data.about, data.avatar);
  })
  .catch(handleInvalidResponse);

getCards()
.then(handleResponse)
.then(data => {
  data.forEach(item => {
    const newCard = createCard(item.name, item.link);
    const cardLikeCounter = newCard.querySelector('.element__like-counter');
    cardLikeCounter.textContent = item.likes.length;
    insertCard(newCard);
  })
})
.catch(handleInvalidResponse);


/* -----Обработчики событий----- */
// Нажатие на плюсик - создать карточку
cardsButtonAdd.addEventListener('click', evt => openPopup(cardsPopup));

// Сохранение в редакторе карточки - создать карточку
cardsForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  sendCard(cardName.value, cardLink.value)
  .then(handleResponse)
  .then(data => {
    const newCard = createCard(data.name, data.link);
    insertCard(newCard);
    closePopup(cardsPopup);
    // Очищаем форму, которая и есть цель события
    evt.target.reset();
    disableButton(cardButtonSubmit);
  })
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

// Нажатие на аватарку
profileAvatarContainer.addEventListener('click', (evt) => openPopup(profileAvatarPopup));
// Сохранение в редакторе аватарки
profileAvatarForm.addEventListener('submit', evt => {
  evt.preventDefault();
  // Почему-то нужно передавать в аргумент value тега input. Т.е. нельзя сохранить в переменную profileAvatarLinkModal сразу value.
  // Наверное потому что нам надо свежее значение value. При загрузке страницы value пустой, и именно пустая строка запишется в переменную
  sendProfileAvatar(profileAvatarLinkModal.value)
  .then(handleResponse)
  .then(data => {
    profileAvatarElement.src = data.avatar;
    closePopup(profileAvatarPopup);
    evt.target.reset();
  })
  .catch(handleInvalidResponse);
  });
