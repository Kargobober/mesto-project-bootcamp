const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-12',
  headers: {
    authorization: '7da61f33-1d7f-460e-844f-4b16d0869fbe',
    'Content-Type': 'application/json',
  }
}

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
}

export const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка ${response.status}.`);
  }
}

export const handleInvalidResponse = (err) => {
  console.log(err);
}

export const sendProfileInfo = (nameValue, aboutValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: nameValue,
      about: aboutValue,
    }),
  })
}

export const sendProfileAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
}

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
}

export const sendCard = (nameValue, linkValue) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: nameValue,
      link: linkValue,
    })
  })
}

export const sendLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT',
  })
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  })
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  })
}

function createRegExp (searchValue) {
  // Первый обратный слэш экранирует второй обратный, чтобы второй считывался как собственно обратный слэш, чтобы в дальнеёшем экранировать
  // переданные функции символы на тот случай, если они являются регулярными. А я как разу использую точки
  const myRegExp = new RegExp (`\\${searchValue}`);
  return myRegExp;
}

export const changeButtonText = (button, text) => {
  button.textContent = text;
}
