/* ИМПОРТЫ */
// Данный импорт работает только с Вебпаком
import '../pages/index.css';

import { getProfileInfo, sendProfileInfo, sendProfileAvatar, getCards, sendCard, deleteCard } from './api.js';
import { cardForDeletion, deletionPopup, validationSettings, currentUser } from './const.js';
import { createCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { disableButton, enableValidation, resetRenderValidation } from './validate.js';
import { handleInvalidResponse, changeButtonText } from './utils.js';




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

const deletionForm = deletionPopup.querySelector('.form');



/* -----Функции----- */
function insertCard(item) {
  cards.prepend(item);
}

// Обновление данных профиля
function updateLocalProfile(name, about, avatar) {
  profileUserName.textContent = name;
  profileAbout.textContent = about;
  if (avatar) {
    profileAvatarElement.src = avatar;
  }
}

// Обновление профиля данными от пользователя (из модального окна)
function saveProfile(evt) {
  changeButtonText(evt.submitter, 'Сохранение...');
  evt.preventDefault();
  sendProfileInfo(userNameModal.value, userAboutModal.value)
    .then((data) => {
      updateLocalProfile(data.name, data.about);
      closePopup(profilePopup);
    })
    .catch(handleInvalidResponse)
    .finally(res => changeButtonText(evt.submitter, 'Сохранить'));
}

function updateUserId (variable, newValue) {
  variable = newValue;
}

/* -----Логика----- */
enableValidation(validationSettings);

// Получение данные от сервера (профиль и карточки)
// Запросы можно сделать параллельно, что ускорит загрузку страницы (особенно если бы она была больше),
// дождаться исполнения обоих промисов и лишь затем обрабатывать их данные, т.к. данные из ответов связаны
Promise.all([getProfileInfo(), getCards()])
  .then(([dataProfile, dataCards]) => {
    updateLocalProfile(dataProfile.name, dataProfile.about, dataProfile.avatar);
    updateUserId(currentUser, dataProfile._id);

    dataCards.forEach(item => {
      const newCard = createCard(item.name, item.link, item._id, item.likes, item.owner);
      insertCard(newCard.markup);
    })
  })
  .catch(err => {
    handleInvalidResponse(err);
  });



/* -----Обработчики событий----- */
// Нажатие на плюсик - открыть редактор создания карточки
cardsButtonAdd.addEventListener('click', evt => openPopup(cardsPopup));

// Сохранение в редакторе карточки - создать карточку
cardsForm.addEventListener('submit', function (evt) {
  changeButtonText(evt.submitter, 'Создание...');
  evt.preventDefault();

  sendCard(cardName.value, cardLink.value)
    .then(data => {
      const newCard = createCard(data.name, data.link, data._id);
      insertCard(newCard.markup);
      closePopup(cardsPopup);
      /* Сбрасываем форму, которая и есть цель события. Т.к. value
      (которые не свойства input-a, а атрибуты(отвечают за значение по умолч.)) не прописаны, то значение по ум. - пустота.*/
      evt.target.reset();
      /*При успешном сабмите ошибок быть не могло, а при простом закрытии формы я намеренно
      хочу оставить старые неотправленные данные, чтобы юзер мог вернуться к их редактированию,
      потому я лишь отключаю кнопку, а не провожу полный рендер формы (функцией resetRenderValidation)*/
      disableButton(cardButtonSubmit);
    })
    .catch(handleInvalidResponse)
    .finally(res => changeButtonText(evt.submitter, 'Создать'));
});

// Открывание редактора профиля
profileButtonEdit.addEventListener('click', function (evt) {
  userNameModal.value = profileUserName.textContent;
  userAboutModal.value = profileAbout.textContent;
  /* Ситуация: пользователь открыл редактор профиля, ввёл невалидные данные и закрыл форму
  без сохранения (при этом тексты ошибок заполнились, добавились стили для невалидных инпутов)
  Затем пользователь вновь открывает форму. В неё из-за кода выше подтягиваются старые данные пользователя (валидные),
  но тексты ошибок и стили инпутов не изменились, т.к. не было новых событий input (см. validate.js).
  Значит, надо:
    - сбросить стили инпутов, тексты ошибок, т.к. старые данные валидные
    - отключить кнопку отправки, т.к. нет смысла отсылать запрос на сервер с такими же данными как сейчас */
  resetRenderValidation(profileForm, validationSettings);
  openPopup(profilePopup);
});

// Сохранение в редакторе профиля
// Вешаем слушателя не на кнопку, а на форму целиком!
profileForm.addEventListener('submit', saveProfile);

// Нажатие на аватарку
profileAvatarContainer.addEventListener('click', (evt) => openPopup(profileAvatarPopup));
// Сохранение в редакторе аватарки
profileAvatarForm.addEventListener('submit', evt => {
  changeButtonText(evt.submitter, 'Сохранение...');
  evt.preventDefault();
  // Почему-то нужно передавать в аргумент value тега input. Т.е. нельзя сохранить в переменную profileAvatarLinkModal сразу value.
  // Наверное потому что нам надо свежее значение value. При загрузке страницы value пустой, и именно пустая строка запишется в переменную
  sendProfileAvatar(profileAvatarLinkModal.value)
    .then(data => {
      profileAvatarElement.src = data.avatar;
      closePopup(profileAvatarPopup);
      evt.target.reset();
      // Вместо полного рендера валидации достаточно откличть кнопку, т.к.
      // при успшеном сабмите ошибок не может быть.
      // А вот кнопка при загрузке страницы выключена (кодом из validate.js), но после успешной смены аватарки
      //  на новую вновь станет активной даже при пустом поле ссылки.
      disableButton(evt.submitter);
    })
    .catch(handleInvalidResponse)
    .finally(res => changeButtonText(evt.submitter, 'Сохранить'));
});

// Подтверждение удаления
deletionForm.addEventListener('submit', evt => {
  evt.preventDefault();
  changeButtonText(evt.submitter, 'Удаление...');
  deleteCard(cardForDeletion._id)
    .then(data => cardForDeletion.markup.remove())
    .catch(handleInvalidResponse)
    .finally(data => {
      cardForDeletion.markup = '';
      cardForDeletion._id = '';
      closePopup(deletionPopup);
      changeButtonText(evt.submitter, 'Да');
    })
})
