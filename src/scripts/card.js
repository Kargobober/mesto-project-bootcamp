import { cardPopup, preparePopupCard, openPopup } from './modal.js';



// У объекта template в его свойстве content сразу находим элемент списка (элемент вёрстки)
const templateCard = document.getElementById('template-element').content.querySelector('.element');



export function createCard(name, imgLink) {
  const newCard = templateCard.cloneNode(true);
  const cardName = newCard.querySelector('.element__heading');
  const cardImage = newCard.querySelector('.element__image');
  const cardButtonLike = newCard.querySelector('.element__like-button');
  const cardButtonDelete = newCard.querySelector('.element__delete-button');
  cardName.textContent = name;
  cardImage.setAttribute('src', imgLink);
  cardImage.setAttribute('alt', name);
  cardButtonLike.addEventListener('click', evt => evt.target.classList.toggle('element__like-button_checked'));
  cardButtonDelete.addEventListener('click', evt => evt.target.closest('.element').remove());
  cardImage.addEventListener('click', evt => {
    preparePopupCard(name, imgLink);
    openPopup(cardPopup);
  });
  return newCard;
}
