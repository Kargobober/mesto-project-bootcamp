const closeButtons = document.querySelectorAll('.pop-up__close-button');
export const cardPopup = document.getElementById('pop-up_card');
const cardPopupImage = cardPopup.querySelector('.pop-up__image');
const cardPopupName = cardPopup.querySelector('.pop-up__heading');



export function openPopup(popupElement) {
  popupElement.classList.add('pop-up_opened');
}

export function closePopup(popupElement) {
  popupElement.classList.remove('pop-up_opened');
}

export function preparePopupCard (name, imgLink) {
  cardPopupImage.setAttribute('src', imgLink);
  cardPopupImage.setAttribute('alt', name);
  cardPopupName.textContent = name;
}



// ????????????????Я не экспортирую данный обработчик, он тогда не сработает?
closeButtons.forEach((currentButton) => {
  const currentPopup = currentButton.closest('.pop-up');
  currentButton.addEventListener('click', (evt) => closePopup(currentPopup));
});
