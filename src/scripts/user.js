import { validationSettings, a } from './index.js';
import { handleInvalidResponse, handleResponse, sendProfileInfo } from './api.js';
import { openPopup, closePopup } from './modal.js';
console.log(validationSettings, a)

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
const profileErrorElements = profileForm.querySelectorAll(userSettings.selectorErrorElement);
const profileAvatarElement = document.querySelector(userSettings.selectorAvatar);



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

// Обновление данных профиля
export function updateLocalProfile(name, about, avatar) {
  profileUserName.textContent = name;
  profileAbout.textContent = about;
  if (avatar === undefined) {} else {
    profileAvatarElement.src = avatar;
  }
}



// Открывание редактора профиля
profileButtonEdit.addEventListener('click', function(evt) {
  userNameModal.value = profileUserName.textContent;
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
