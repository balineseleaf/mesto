// класс UserInfo отвечает за управление отображением информации о пользователе на странице
//Принимает в конструктор объект с селекторами двух элементов: 
//элемента имени пользователя и элемента информации о себе.
export default class UserInfo { 
  constructor ({profileName, profileDescription, profileAvatar}) {
    this._name = profileName;
    this._about = profileDescription;
    this._profileAvatar = profileAvatar;
  };

  // cодержит публичный метод getUserInfo, который возвращает объект с данными пользователя
  // этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  // есть метод getUserInfo который возвращает текущие значения из разметки
  // то есть textContent свойство двух элементов в виде объекта

  //Фукнция getUserInfo должна достать значения из элементов профиля и вернуть объект
    getUserInfo () {
      return {
        name: this._name.textContent,
        about: this._about.textContent,
      }// вернет нам объект к 2 полями, мы получим данные с экрана и перерадим 
      // в index.js  для константы userData и дальше будет ее уже использовать
    };

  // cодержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  // setUserInfo должен принять объект данных и проставить из него значения в элементы профиля
    setUserInfo (userData) {// разбирали 
      this._name.textContent = userData.name;
      this._about.textContent = userData.about;
      this._profileAvatar.src = userData.avatar;
    };

    setUserAvatar (avatar) { // ссылка на аватар приходит
      this._profileAvatar.src = avatar;
  }
};