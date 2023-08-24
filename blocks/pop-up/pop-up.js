const popupElementProfile = document.getElementById('pop-up-profile');

function openPopup (popupElement) {
  popupElement.classList.toggle('pop-up_opened');
}

const buttonEditProfile = document.main.querySelector('.profile__edit-button');

buttonEditProfile.addEventListener('click', openPopup(popupElementProfile));
