// В данном документе подразумевается, что попап и модальное окно - одно и то же
/* Глобальные переменные */
const profilePopup = document.getElementById('pop-up_profile');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const profileButtonClose = profilePopup.querySelector('.pop-up__close-button');
// Поиск формы внутри коллекции форм документа
const profileForm = document.forms["form-profile"];
// Данные о пользователе со страницы (не из формы внутри модального окна)
const profileUsername = document.querySelector('.profile__username');
const profileAbout = document.querySelector('.profile__user-about');
const profileButtonSave = profileForm.querySelector('.form__submit-button');



/* Функции */
function openPopup (popupElement) {
  popupElement.classList.add('pop-up_opened');
}

function closePopup (popupElement) {
  popupElement.classList.remove('pop-up_opened');
}

function saveProfile (evt) {
  evt.preventDefault();
  const usernameModal = profilePopup.querySelector('input[name="name"]');
  const userAboutModal = profilePopup.querySelector('input[name="about"]');
  profileUsername.textContent = usernameModal.value;
  profileAbout.textContent = userAboutModal.value;
  closePopup(profilePopup);
}


/* Обработчики событий */
// Нажатие на редактирование профиля
profileButtonEdit.addEventListener('click', function (evt) {
  const usernameModal = profilePopup.querySelector('input[name="name"]');
  const userAboutModal = profilePopup.querySelector('input[name="about"]');
  usernameModal.value = profileUsername.textContent;
  userAboutModal.value = profileAbout.textContent;
  openPopup(profilePopup);
});

// Нажатие на крестик в попапе профиля
profileButtonClose.addEventListener('click', function (evt) {
  closePopup(profilePopup);
});

// Сохранение в редакторе профиля
// Вешаем слушателя не на кнопку, а на форму целиком!
profileForm.addEventListener('submit', saveProfile);
