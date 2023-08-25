// Глобальные переменные
const popupElementProfile = document.getElementById('pop-up_profile');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const profileButtonClose = popupElementProfile.querySelector('.pop-up__close-button');
const profileUsername = document.querySelector('.profile__username');
const profileAbout = document.querySelector('.profile__user-about');


// Функции
function openPopup (popupElement) {
  popupElement.classList.add('pop-up_opened');
}

function closePopup (popupElement) {
  popupElement.classList.remove('pop-up_opened');
}


// Обработчики событий
profileButtonEdit.addEventListener('click', function () {
  const usernameModal = popupElementProfile.querySelector('input[name="name"]');
  const userAboutModal = popupElementProfile.querySelector('input[name="about"]');
  usernameModal.value = profileUsername.textContent;
  userAboutModal.value = profileAbout.textContent;
  openPopup(popupElementProfile);
});

profileButtonClose.addEventListener('click', function () {
  closePopup(popupElementProfile);
});
