"use strict"

// код на каком устройстве открыта страница, на татчскрине или с использованием мыши
//операционная система и браузер определеяются, открыто на мобильном или на пк

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


if (isMobile.any()) {

    document.body.classList.add('_touch'); // к body добваляется класс _touch если мобила

    let menuArrows = document.querySelectorAll('.menu__arrow'); // сбор в переменную всех стрелок в документе
    if (menuArrows.length > 0) { // проверка, существуют ли стрелки в принципе
        for (let index = 0; index < menuArrows.length; index++) {// если есть - цикл, чтобы пробежаться по всем
            const menuArrow = menuArrows[index]; // создаем константу с каждой из стрелок
            menuArrow.addEventListener("click", function (e) { // навешиваем событие клик
                menuArrow.parentElement.classList.toggle('_active'); // добавить класс родителю, если есть - и убрать если нет (toggle)
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}

// Меню бургер (можно смело использовать и без адаптива)
const iconMenu = document.querySelector('.header__icon'); // получаем иконку бургера
const menuBody = document.querySelector('.menu__body'); // константа вынесена, чтобы код внизу её тоже видел
if (iconMenu) { // проверка, есть ли такой класс в принципе
    iconMenu.addEventListener("click", function (e) { // событие клик по иконке
        document.body.classList.toggle('_lock'); //  добавление-убавление класса _lock при открытом меню для body
        iconMenu.classList.toggle('_active'); // для самой иконки добавляется или убирается класс _active
        menuBody.classList.toggle('_active'); // и для .menu__body
    });
}

// Прокрутка при клике
// при клике 1. Происходит плавная прокрутка до нужного раздела 2.Закрывается бургер и откатываются связанные классы

const menuLinks = document.querySelectorAll('.header__link[data-goto]'); //найти .menu__link но только с атрибутом data-goto
if (menuLinks.length > 0) { // проверка есть ли что-нибудь из этого
    menuLinks.forEach(menuLink => { // forEach() выполняет указанную функцию один раз для каждого элемента в массиве.
        menuLink.addEventListener("click", onMenuLinkClick); // вешаем клик и создаем функцию onMenuLinkClick
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target; // объект, на который кликаем (сама ссылка)
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { // заполнен ли дата-атрибут && существует ли объект, на который ссылается данный дата-атрибут
            const gotoBlock = document.querySelector(menuLink.dataset.goto); // получаем в константу сам объект
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            // см. выше - высчитываем положение объекта с учетом высоты шапки
            // const gotoBlockValue  - создается константа, с помощью функции getBoundingClientRect() top - т.к. от верха объекта - итог - местоположение в пикселях 
            // + pageYOffset - прибавить количество прокрученных пикселей (Y тк по вертикали),  -document.querySelector('header').offsetHeight - отнимается высота шапки

            if (iconMenu.classList.contains('_active')) { // без этой части кода будет происходить прокрутка при нажатии на пункты, но меню не закроется
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({ // скролл - обращение к окну браузера и функция прокрутки scrollTo
                top: gotoBlockValue, // нужно прокрутиться сверху высчитанной константой
                behavior: "smooth" // плавная прокрутка
            });
            e.preventDefault(); // отключение работы ссылки, чтобы никуда не отсылала, а только прокручивала
        }
    }
}
