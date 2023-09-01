// Данный импорт работает только с Вебпаком
import '../pages/index.css';

/* -----Исходные данные----- */
// Массив с картиночками

// Для локальных файлов картинок изменим логику получения ссылки
const imageRuskealaBig = new URL('../images/place-ruskeala-big.jpg', import.meta.url);
const imageVyborgBig = new URL('../images/place-vyborg-big.jpg', import.meta.url);
const imageYastrebinoyeBig = new URL('../images/place-yastrebinoye-big.jpg', import.meta.url);
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
  {
    name: 'Рускеала',
    link: imageRuskealaBig,
  },
  {
    name: 'Выборг',
    link: imageVyborgBig,
  },
  {
    name: 'Ястребиное озеро',
    link: imageYastrebinoyeBig,
  },
]


// В данном документе подразумевается, что попап и модальное окно - одно и то же


/* -----Глобальные переменные----- */
const profilePopup = document.getElementById('pop-up_profile');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const profileButtonClose = profilePopup.querySelector('.pop-up__close-button');
// Поиск формы внутри коллекции форм документа
const profileForm = document.forms['form-profile'];
// Данные о пользователе со страницы (не из формы внутри модального окна)
const profileUsername = document.querySelector('.profile__username');
const profileAbout = document.querySelector('.profile__user-about');
const profileButtonSave = profileForm.querySelector('.form__submit-button');
// У объекта template в его свойстве content сразу находим элемент списка (элемент вёрстки)
const templateCard = document.getElementById('template-element').content.querySelector('.element');
const cards = document.querySelector('.elements__list');
const cardsButtonAdd = document.querySelector('.profile__add-button');
const cardsPopup = document.getElementById('pop-up_element');
const cardsForm = document.forms['form-element'];
const cardsButtonClose = cardsPopup.querySelector('.pop-up__close-button');
const cardPopup = document.getElementById('pop-up_card');
const cardPopupButtonClose = cardPopup.querySelector('.pop-up__close-button');
const cardPopupImage = cardPopup.querySelector('.pop-up__image');
const cardPopupName = cardPopup.querySelector('.pop-up__heading');
const userNameModal = profilePopup.querySelector('input[name="name"]');
const userAboutModal = profilePopup.querySelector('input[name="about"]');
const closeButtons = document.querySelectorAll('.pop-up__close-button');
const cardName = cardsForm.querySelector('input[name="name"]');
const cardLink = cardsForm.querySelector('input[name="link"]');


/* -----Функции----- */
function openPopup(popupElement) {
  popupElement.classList.add('pop-up_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('pop-up_opened');
}

function saveProfile(evt) {
  evt.preventDefault();
  profileUsername.textContent = userNameModal.value;
  profileAbout.textContent = userAboutModal.value;
  closePopup(profilePopup);
}

function createCard(name, imgLink) {
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
    cardPopupImage.setAttribute('src', imgLink);
    cardPopupImage.setAttribute('alt', name);
    cardPopupName.textContent = name;
    openPopup(cardPopup);
  });
  return newCard;
}

function insertCard(item) {
  cards.prepend(item);
}


/* -----Логика----- */
// Динамическое создание карточек из массива
initialCards.forEach(item => {
  const newCard = createCard(item.name, item.link);
  insertCard(newCard);
});

closeButtons.forEach((currentButton) => {
  const currentPopup = currentButton.closest('.pop-up');
  currentButton.addEventListener('click', (evt) => closePopup(currentPopup));
});

/* -----Обработчики событий----- */
// Нажатие на редактирование профиля
profileButtonEdit.addEventListener('click', function(evt) {
  userNameModal.value = profileUsername.textContent;
  userAboutModal.value = profileAbout.textContent;
  openPopup(profilePopup);
});

// Нажатие на крестик в попапе профиля
profileButtonClose.addEventListener('click', function(evt) {
  closePopup(profilePopup);
});

// Сохранение в редакторе профиля
// Вешаем слушателя не на кнопку, а на форму целиком!
profileForm.addEventListener('submit', saveProfile);

// Нажатие на плюсик - создать карточку
cardsButtonAdd.addEventListener('click', evt => openPopup(cardsPopup));
// Нажатие на крестик в попапе карточки - закрыть редактор карточки
cardsButtonClose.addEventListener('click', evt => closePopup(cardsPopup));
// Сохранение в редакторе карточки - создать карточку
cardsForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = createCard(cardName.value, cardLink.value);
  insertCard(newCard);
  closePopup(cardsPopup);
  // Очищаем форму, которая и есть цель события
  evt.target.reset();
})

cardPopupButtonClose.addEventListener('click', evt => closePopup(cardPopup));
