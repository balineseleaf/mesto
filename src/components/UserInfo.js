// класс UserInfo отвечает за управление отображением информации о пользователе на странице
//Принимает в конструктор объект с селекторами двух элементов: 
//элемента имени пользователя и элемента информации о себе.
export default class UserInfo { 
  constructor ({profileName, profileDescription}) {
    this._name = profileName;
    this._description = profileDescription;
  };

  // cодержит публичный метод getUserInfo, который возвращает объект с данными пользователя
  // этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  // есть метод getUserInfo который возвращает текущие значения из разметки
  // то есть textContent свойство двух элементов в виде объекта

  //Фукнция getUserInfo должна достать значения из элементов профиля и вернуть объект
  getUserInfo () {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  };

  // cодержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  // setUserInfo должен принять объект данных и проставить из него значения в элементы профиля
  setUserInfo (userData) {  // разбирали 
    this._name.textContent = userData.name;
    this._description.textContent = userData.description;
 
  };

};