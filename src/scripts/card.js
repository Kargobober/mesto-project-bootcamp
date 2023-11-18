import { sendLike, deleteLike } from './api.js';
import { cardForDeletion, deletionPopup, validationSettings, currentUser } from './const.js';
import { cardPopup, preparePopupCard, openPopup } from './modal.js';
import { enableButton } from './validate.js';
import { handleInvalidResponse } from './utils.js';



// У объекта template в его свойстве content сразу находим элемент списка (элемент вёрстки)
const templateCard = document.getElementById('template-element').content.querySelector('.element');

function renderLike (cardObject, likesArray, isAddition) {
  cardObject.likes = likesArray;
  cardObject.likeCounter.textContent = cardObject.likes.length;
  cardObject.buttonLike.classList.toggle('element__like-button_checked', isAddition);
}

export function createCard(name, imgLink, id, likesArr, ownerObj) {
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
  newCard.likes = likesArr;
  newCard.likeCounter.textContent = newCard.likes.length;
  // В массиве likes содержатся объекты. Каждый объект - представление пользователя.
  // У пользователя есть свойство id - не карточки, а самого человека. К нему и обращаемся ниже
  // Id пользователя получаем при ответе сервера про данные пользователя (getProfileInfo)
  // findIndex останавливается при нахождении элемента, удовл-его условию
  if (newCard.likes.findIndex(userObj => userObj._id === currentUser) > -1) {
    newCard.buttonLike.classList.add('element__like-button_checked');
  }
  if (!(ownerObj._id === currentUser)) {
    newCard.buttonDelete.remove();
  }


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
          renderLike(newCard, data.likes, true);
        })
        .catch(handleInvalidResponse);
    } else {
      deleteLike(newCard._id)
        .then(data => {
          renderLike(newCard, data.likes, false);
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
