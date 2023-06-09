// класс Section, который отвечает за отрисовку элементов на странице
export default class Section { 
    // первым параметром конструктора принимает объект с двумя свойствами: items и renderer
    // свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса, массив карточек items
    // cвойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице,
    // описывает логику создания новой карточки
    // второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы
    constructor ({ items, renderer }, containerSelector) {
      this._items = items; // массив initialCards
      this._renderer = renderer; //  ƒ renderCard(cardData) 
      this.container = containerSelector;// section class = "elements" - куда добавляем эл-ты

    };
  
     // cодержит публичный метод, который отвечает за отрисовку всех элементов
    // отрисовка каждого отдельного элемента должна осуществляться функцией renderer
    renderItems() { // карточки при загрузке страницы
      this._items.forEach((item) => { // приходит Объект с 2 полями: name, link
        this._renderer(item); // Классу Section безразлично, что будет происходить дальше
        // его задача просто вызвать renderer и передать ему текущий item 
        // Класс этот может работать с чем угодно, 
        //с любым массивом, приходящим в него, 
        //он просто будет брать item и работать с ним. А что конкретно в него приходит, отвечает index.js
    });
    };
  
    // содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер
    addItem(item) { // добавление карточки и мы передаем сюда cardElement, после того как ее сделал метод createCard
      this.container.prepend(item); //<div>
    };
  };
  
