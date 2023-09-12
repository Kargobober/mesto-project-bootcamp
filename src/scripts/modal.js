import { cardForDeletion } from "./const";

const closeButtons = document.querySelectorAll('.pop-up__close-button');
// Попап просмотра карточки на фулскрин
export const cardPopup = document.getElementById('pop-up_card');
const cardPopupImage = cardPopup.querySelector('.pop-up__image');
const cardPopupName = cardPopup.querySelector('.pop-up__heading');
const popupList = document.querySelectorAll('.pop-up');



export function closePopup(popupElement) {
  popupElement.classList.remove('pop-up_opened');
  /* Мы ставим и удаляем слушатель escape при открытии и закрытии попапа,
  т.к. в ином случае попап всё время слушал бы escape, т.е. пытался бы
  закрываться даже когда он уже закрыт (когда уже
  удален класс pop-up_opened */
  popupElement.removeEventListener('keydown', closeByEsc);
}

/* В данной функции вместо openedPopup мы не обращаемся к
popupElement функций closePopup или openPopup, т.к.
closeByEsc не видит данные переменные */
function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.pop-up_opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popupElement) {
  popupElement.classList.add('pop-up_opened');
  popupElement.addEventListener('keydown', closeByEsc);
  popupElement.focus();
}

export function preparePopupCard (name, imgLink) {
  cardPopupImage.setAttribute('src', imgLink);
  cardPopupImage.setAttribute('alt', name);
  cardPopupName.textContent = name;
}

function closeInOverlay (evt, popupElement) {
  if (evt.target.classList.contains('pop-up')) closePopup(popupElement);
}



/* Я не экспортирую данный обработчик, он тогда не сработает?
Сработает, т.к. файл данного скрипта включается в итоговый
файл скрипта после сборки вебпаком */
closeButtons.forEach((currentButton) => {
  const currentPopup = currentButton.closest('.pop-up');
  currentButton.addEventListener('click', (evt) => {
    if (currentPopup.id === 'pop-up_deletion') {
      cardForDeletion.markup = '';
      cardForDeletion._id = '';
    }
    closePopup(currentPopup);
  });
});

/* Нужно именно mousedown, иначе для click:
при зажатии кнопки в форме, выведении мышки на
оверлэй и лишь затем отпускании кнопки - закроется весь попап */
/* Обработчик клика на овэрлэй можно повесить не при открытии, и
можно и не удалять при закрытии, а повесить на постоянной основе, т.к.
данный обработчик не заставит браузер постоянно слать себе уведомления о клике по себе же, т.к. клики не будут происходить, ведь попап если скрыт - то он скрыт и клик происходит не по нему, а по другим элементам страницы. Значит, батарейка пользователя в сохранности */
popupList.forEach(currentPopup => {
  currentPopup.addEventListener('mousedown', evt => closeInOverlay(evt, currentPopup));
});
