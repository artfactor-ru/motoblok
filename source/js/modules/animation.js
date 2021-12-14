// Функция определяет когда элемент видно при скролле
let Visible = function(target) {

    for (let i = 0; i < target.length; i++) {
        // Все позиции элемента
        var targetPosition = {
                top: window.pageYOffset + target[i].getBoundingClientRect().top,
                left: window.pageXOffset + target[i].getBoundingClientRect().left,
                right: window.pageXOffset + target[i].getBoundingClientRect().right,
                bottom: window.pageYOffset + target[i].getBoundingClientRect().bottom
            },
            // Получаем позиции окна
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };

        if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
            targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
            targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
            targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
            // Если элемент полностью видно, то запускаем следующий код
            target[i].classList.add('anitrigger');


        } else {
            // Если элемент не видно, то запускаем этот код
            if (target[i].classList.contains('hero')) {
                target[i].classList.remove('anitrigger');
            }

        };
    }

};

function showAndHideMenuOnScroll() {

    let header = document.querySelector('.header');
    if (oldScrollTopPosition > scrollTopPosition) {

        header.style.transform = "translateY(0%)";


    } else {
        header.style.transform = "translateY(-100%)";


    }
    if (winScroll == 0) {
        header.style.transform = "translateY(0%)";
    }
    oldScrollTopPosition = scrollTopPosition;
}


function showAndHideBtnOnScroll() {

    let btnFlow = document.querySelector('.btn-up--flow');
    if (winScroll > 1000) {
        btnFlow.classList.add('active');
    } else {
        btnFlow.classList.remove('active');
    }
}


// Получаем нужный элемент
let element = document.querySelectorAll('.animated');
let elPreload = document.querySelectorAll('.animated--preloader');

// Переменная для меню
let oldScrollTopPosition = 0;
let winScroll;
let scrollTopPosition;



window.addEventListener('load', function() {
    // Запускаем функцию при прокрутке страницы
    window.addEventListener('scroll', function() {
        winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        scrollTopPosition = document.body.scrollTop || document.documentElement.scrollTop;

        // Вызываем анимацию на элементе
        Visible(element);
        Visible(document.querySelectorAll('.hero'));
        showAndHideMenuOnScroll();

        showAndHideBtnOnScroll();
    });
    Visible(element);
    Visible(document.querySelectorAll('.hero'));
    // А также запустим функцию сразу. А то вдруг, элемент изначально видно, и для элементов в прелоуадере
    setTimeout(function() {
        Visible(elPreload);
    }, 500)


})