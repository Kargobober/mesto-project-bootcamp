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
    return Promise.reject(`Ошибка ${response.status}: ${response.statusText}.`);
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
