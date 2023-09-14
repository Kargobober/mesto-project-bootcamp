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
  .then(handleResponse);
}

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    // Из ответа сервера извлекаем объект данных и обращаемся к его свойствам,
    // но не забываем, что метод .json() – асинхронный → нужен .then()
    return response.json()
    .then(err => Promise.reject(err.message));
  }
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
  .then(handleResponse);
}

export const sendProfileAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
  .then(handleResponse);
}

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(handleResponse);
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
  .then(handleResponse);
}

export const sendLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT',
  })
  .then(handleResponse);
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then(handleResponse);
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then(handleResponse);
}
