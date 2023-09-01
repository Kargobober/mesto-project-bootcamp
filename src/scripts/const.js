/* -----Исходные данные----- */
// Массив с картиночками
// Для локальных файлов картинок изменим логику получения ссылки
const imageRuskealaBig = new URL('../images/place-ruskeala-big.jpg', import.meta.url);
const imageVyborgBig = new URL('../images/place-vyborg-big.jpg', import.meta.url);
const imageYastrebinoyeBig = new URL('../images/place-yastrebinoye-big.jpg', import.meta.url);
export const initialCards = [
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
