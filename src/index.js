// Данный импорт работает только с Вебпаком
import './pages/index.css';

/* -----Исходные данные----- */
// Массив с картиночками
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
    link: './images/place-ruskeala-big.jpg',
  },
  {
    name: 'Выборг',
    link: './images/place-vyborg-big.jpg',
  },
  {
    name: 'Ястребиное озеро',
    link: './images/place-yastrebinoye-big.jpg',
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


/* -----Функции----- */
function openPopup(popupElement) {
  popupElement.classList.add('pop-up_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('pop-up_opened');
}

function saveProfile(evt) {
  evt.preventDefault();
  const usernameModal = profilePopup.querySelector('input[name="name"]');
  const userAboutModal = profilePopup.querySelector('input[name="about"]');
  profileUsername.textContent = usernameModal.value;
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
    cardPopupButtonClose.addEventListener('click', evt => closePopup(cardPopup));
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


/* -----Обработчики событий----- */
// Нажатие на редактирование профиля
profileButtonEdit.addEventListener('click', function(evt) {
  const usernameModal = profilePopup.querySelector('input[name="name"]');
  const userAboutModal = profilePopup.querySelector('input[name="about"]');
  usernameModal.value = profileUsername.textContent;
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
  const cardName = cardsForm.querySelector('input[name="name"]');
  const cardLink = cardsForm.querySelector('input[name="link"]');
  const newCard = createCard(cardName.value, cardLink.value);
  insertCard(newCard);
  closePopup(cardsPopup);
  cardName.value = '';
  cardLink.value = '';
})
