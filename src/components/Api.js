export default class Api {
    constructor(config) {
      this._url = config.url; // url 
      this._headers = config.headers; // заголовок
      this._authorization = config.headers.authorization;// token
      // this._name = config.name;
      // this._link = config.link;
      // this._ownerName = config.owner.name;
      // this._about = config.owner.about;
      // this._avatar = config.owner.avatar;
      //console.log('10', config.owner.avatar);
    }

    getUserData() {
        return fetch(`${this._url}/users/me`, { 
            method: 'GET',
            headers: {
              authorization: this._authorization,
            }           
        })
        .then(this._handleResponse) 
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, { // Возвращает Promise- объект 
            method: 'GET',
            headers: {
              authorization: this._authorization,
              'Content-type': 'application/json'
            }           
        }) // 200 ms проходит, в эвент луп, и когда запрос придет обратно, отработает этот колбэк (ниже)
        .then(this._handleResponse)
    }

    getUpdateUserData(userData) {
      console.log('1', userData);
        return fetch(`${this._url}/users/me`, { 
            method: 'PATCH',
            headers: {
              authorization: this._authorization,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              { 
                name: userData.name, 
                about: userData.about
              })           
        })
        .then(this._handleResponse)
    }

    getNewAvatar(avatar) { //link: ссылка на аватар 
        return fetch(`${this._url}/users/me/avatar`, { 
            method: 'PATCH',
            headers: {
              authorization: this._authorization,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({avatar: avatar.link})  // поле name="link" у инпута  в попапе 
        })
        .then(this._handleResponse)
    }


    postNewCard({name, link}) {
        return fetch(`${this._url}/cards`, { 
            method: 'POST',
            headers: {
              authorization: this._authorization,
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
              }),               
        }) 
        .then(this._handleResponse)
    }


    _handleResponse(res) {
        if (res.ok) {
        return res.json()  // Метод json читает ответ от сервера в формате json
        // и возвращает промис. 
        //Из этого промиса потом можно доставать нужные нам данные.
    } else {
        return Promise.reject(`Ошибка ${res.status}`)
    }
  }
}
//     deleteCard() {
//         return fetch(`${this._url}/${cardId}`, { 
//             method: 'DELETE',
//             headers: {
//               authorization: this._authorization,
//               'Content-type': 'application/json'
//             }           
//         }) 
//          .then(this._handleResponse)
//         })
//         .then((result) => console.log(result)
//         )
//     }
