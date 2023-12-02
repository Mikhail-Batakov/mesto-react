class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //Проверяет ответ от сервера на предмет успешности запроса.
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Выполняет сетевой запрос с использованием fetch и проверяет ответ с помощью _checkResponse.
  // Возвращает результат запроса в виде промиса
  _request(baseUrl, options) {
    return fetch(baseUrl, options).then(this._checkRes);
  }

  //Метод запроса информации о пользователе
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }
  // Метод запроса информации о пользователе
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  // Метод отправки информации о пользователе
  sendUserInfo(userData) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.username,
        about: userData.job,
      }),
    });
  }

  // Метод установки аватара профиля
  setUserAvatar(avatarData) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarData.avatar,
      }),
    });
  }

  // Метод добавления новой карточки
  sendNewCardInfo(cardData) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    });
  }

  // Метод удаления карточки
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // // Метод установки лайков
  // setCardLike(cardId) {
  //   return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: "PUT",
  //     headers: this._headers,
  //   });
  // }

  // // Метод удаления лайка карточки
  // deleteCardLike(cardId) {
  //   return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   });
  // }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
    });
  }
}

// Создание экземпляра класса
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-77",
  headers: {
    authorization: "3edcdea5-b130-42c1-9a7c-9c803e968261",
    "Content-Type": "application/json",
  },
});

export default api;
