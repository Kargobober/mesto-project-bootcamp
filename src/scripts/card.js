import { handleInvalidResponse, handleResponse, sendLike, deleteLike } from './api.js';
import { cardPopup, preparePopupCard, openPopup } from './modal.js';



// У объекта template в его свойстве content сразу находим элемент списка (элемент вёрстки)
const templateCard = document.getElementById('template-element').content.querySelector('.element');



export function createCard(name, imgLink, id) {
  const newCard = {};
  // id карточки
  newCard._id = id;
  newCard.markup = templateCard.cloneNode(true);
  const cardName = newCard.markup.querySelector('.element__heading');
  const cardImage = newCard.markup.querySelector('.element__image');
  newCard.buttonLike = newCard.markup.querySelector('.element__like-button');
  const cardButtonDelete = newCard.markup.querySelector('.element__delete-button');
  newCard.likeCounter = newCard.markup.querySelector('.element__like-counter');

  cardName.textContent = name;
  cardImage.setAttribute('src', imgLink);
  cardImage.setAttribute('alt', name);
  cardButtonDelete.addEventListener('click', evt => evt.target.closest('.element').remove());
    newCard.buttonLike.addEventListener('click', evt => {
      if (!newCard.buttonLike.classList.contains('element__like-button_checked')) {
        sendLike(newCard._id)
        .then(handleResponse)
        .then(data => {
          newCard.likes = data.likes;
          newCard.likeCounter.textContent = newCard.likes.length;
          evt.target.classList.add('element__like-button_checked');
        })
        .catch(handleInvalidResponse);
      } else {
        deleteLike(newCard._id)
        .then(handleResponse)
        .then(data => {
          newCard.likes = data.likes;
          newCard.likeCounter.textContent = newCard.likes.length;
          evt.target.classList.remove('element__like-button_checked');
        })
        .catch(handleInvalidResponse);
      }
    });
  cardImage.addEventListener('click', evt => {
    preparePopupCard(name, imgLink);
    openPopup(cardPopup);
  });

  return newCard;
}
