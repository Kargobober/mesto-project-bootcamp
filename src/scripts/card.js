import { sendLike, deleteLike } from './api.js';
import { cardForDeletion, deletionPopup, validationSettings } from './const.js';
import { cardPopup, preparePopupCard, openPopup } from './modal.js';
import { enableButton } from './validate.js';
import { handleInvalidResponse } from './utils.js';



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
  newCard.buttonDelete = newCard.markup.querySelector('.element__delete-button');
  newCard.likeCounter = newCard.markup.querySelector('.element__like-counter');

  cardName.textContent = name;
  cardImage.setAttribute('src', imgLink);
  cardImage.setAttribute('alt', name);
  newCard.buttonDelete.addEventListener('click', evt => {
    cardForDeletion._id = id;
    cardForDeletion.markup = newCard.markup;
    enableButton(deletionPopup.querySelector(validationSettings.buttonSelector));
    openPopup(deletionPopup);
  });
  newCard.buttonLike.addEventListener('click', evt => {
    if (!newCard.buttonLike.classList.contains('element__like-button_checked')) {
      sendLike(newCard._id)
        .then(data => {
          newCard.likes = data.likes;
          newCard.likeCounter.textContent = newCard.likes.length;
          evt.target.classList.add('element__like-button_checked');
        })
        .catch(handleInvalidResponse);
    } else {
      deleteLike(newCard._id)
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
