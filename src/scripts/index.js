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
let userId = '';


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

// Объединили промисы в одну цепочку, иначе при получении карточек,
// когда идет проверка наличия пользователя в массиве лайкнувших – его айди ещё не определён первым промисом
getProfileInfo()
  .then(handleResponse)
  .then((data) => {
    updateLocalProfile(data.name, data.about, data.avatar);
    userId = data._id;
  })
  // Второй промис (по сути третий :)))) )
  .then(getCards)
  .then(handleResponse)
  .then(data => {
    data.forEach(item => {
      const newCard = createCard(item.name, item.link, item._id);
      newCard.likes = item.likes;
      newCard.likeCounter.textContent = newCard.likes.length;
      // В массиве likes содержатся объекты. Каждый объект - представление пользователя.
      // У пользователя есть свойство id - не карточки, а самого человека. К нему и обращаемся ниже
      // Id пользователя получаем при ответе сервера про данные пользователя (getProfileInfo)
      if (newCard.likes.findIndex(item => item._id === userId) > -1) {
        newCard.buttonLike.classList.add('element__like-button_checked');
      }
      if (!(item.owner._id === userId)) {
        newCard.buttonDelete.remove();
      }
      insertCard(newCard.markup);
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
    const newCard = createCard(data.name, data.link, data._id);
    insertCard(newCard.markup);
    closePopup(cardsPopup);
    // Очищаем форму, которая и есть цель события
    evt.target.reset();
    disableButton(cardButtonSubmit);
  })
  .catch(handleInvalidResponse);
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
