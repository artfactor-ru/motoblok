'use strict';


import { event } from 'jquery';
import * as swiper from './modules/swiper.js';
import * as animation from './modules/animation.js';
import * as menu from './modules/menu.js';
import * as validation from './modules/validation.js';
import * as inputFile from './modules/inputFile.js';
import { mapInit } from './modules/map.js';
import * as accordion from './modules/accordion.js';

import 'lazysizes';
import CustomSelect from 'vanilla-js-dropdown';

var $ = require("jquery");
window.jQuery = $;

var fancybox = require("@fancyapps/fancybox");

import Masonry from 'masonry-layout'
import * as formsubmit from './modules/formsubmit.js';
// dropdown for select


document.addEventListener('lazybeforeunveil', function(e){
    var bg = e.target.getAttribute('data-bg');
    if(bg){
        e.target.style.backgroundImage = 'url(' + bg + ')';
    }
});

if (document.querySelector('#input-select')) {
    const select = new CustomSelect({
        elem: "input-select", // id of the original select element
    });

    // Open the select
    select.open();

    const isSelected = document.querySelector('.is-selected');
    if (isSelected) {
        isSelected.classList.remove('is-selected');
    }

    const selectButton = document.querySelector('.js-Dropdown-title');
    const placeHolderText = document.querySelector('#input-select').getAttribute('placeholder');
    if (selectButton && placeHolderText) {
        selectButton.innerText = placeHolderText;
    };
}


// Определение тач устройств
const breakpointMobile = window.matchMedia('(min-width:1180px)');

let mobileFlag = false;
const breakpointCheckerForMobile = function() {
    // if larger viewport and multi-row layout needed

    if (breakpointMobile.matches === true) {
        mobileFlag = false;
    } else if (breakpointMobile.matches === false) {
        mobileFlag = true;
    }
}



// Нестандартная сетка в отзывах

let msnry;
window.addEventListener('load', function(){
    let grid = document.querySelector('.grid');
    console.log(grid);
    if (grid) {
        imagesLoaded(grid, function() {
            console.log('hi');
            // init Isotope after all images have loaded
            msnry = new Masonry(grid, {
                gutter: '.gup-item',
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });
        });
    }
});


// Фэнси бокс галерея для галерей и попапов

$('[data-fancybox]').fancybox({
    buttons: [
        // 'slideShow',
        // 'fullScreen',
        // 'thumbs',
        //'share',
        // 'download',
        //'zoom',
        'close'
    ],
    thumbs: {
        autoStart: false, // Display thumbnails on opening
        hideOnClose: true, // Hide thumbnail grid when closing animation starts
        // parentEl: ".fancybox-container", // Container is injected into this element
        axis: "y" // Vertical (y) or horizontal (x) scrolling
    },
    youtube: {
        controls: 1,
        showinfo: 0
    },
    vimeo: {
        color: 'f00'
    }

});
$.fancybox.defaults.backFocus = false;



// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    breakpointMobile.addListener(breakpointCheckerForMobile);
    breakpointCheckerForMobile();

    resizeWidthTagButton();
});


document.addEventListener('DOMContentLoaded', function(){
     breakpointMobile.addListener(breakpointCheckerForMobile);
    breakpointCheckerForMobile();
});





function muteAndUnMuteVideo() {
    let btnSound = document.querySelector('.hero__sound');
    let flagVideo = false;
    if (btnSound) {
        btnSound.addEventListener('click', function() {
            btnSound.classList.toggle('off');
            if (!flagVideo) {
                videoHero.muted = false;
                flagVideo = true;
            } else {
                videoHero.muted = true;
                flagVideo = false;
            }
        })
    }

};

let videoHero = document.querySelector('.hero__video');
let preloader = document.querySelector('.preloader');
window.addEventListener('load', function() {


    if (document.querySelector('.swiper-container--banner')) {
        document.querySelector('.swiper-container--banner').classList.add('load');
    }
    resizeWidthTagButton();

    if (!mobileFlag) {

        console.log(mobileFlag);
        if (videoHero) {
            // Загружаем видео
            videoHero.getElementsByTagName('source')[0].src = videoHero.dataset.src;
            videoHero.load();
            videoHero.muted = true;


        }

        setTimeout(function() {
            // Убираем прелоадер и начинаем проигрывать видео
            if (preloader) {
                preloader.style.opacity = 0;
                preloader.style.pointerEvents = 'none';

                if (videoHero) {
                    if (document.querySelector('.hero').classList.contains('anitrigger')) {
                        videoHero.play();
                    } else {
                        videoHero.pause();
                    }
                    window.addEventListener('scroll', function() {
                        if (document.querySelector('.hero').classList.contains('anitrigger')) {
                            videoHero.play();


                        } else {
                            videoHero.pause();

                        }
                    })

                }




                // При клике включаем звук, пока оставить потом посмотри
                let firstClick;
                document.querySelector('.hero').addEventListener('click', function() {
                    if (!firstClick) {
                        firstClick = true;
                        document.querySelector('.hero__sound').click();
                    }

                })

                // Запускаем функцию вкл выкл звук
                muteAndUnMuteVideo();
            }




        }, 2000)


    }else{
        videoHero.getElementsByTagName('source')[0].src = '#';
    }


    setTimeout(function() {
        mapInit();
    }, 5000)
})


function resizeWidthTagButton() {
    const container = document.querySelector('.tag--js');
    let maxWidth = 0;


    if (container) {
        container.querySelectorAll('.tag__link').forEach((element) => {

            if (mobileFlag) {
                element.style.width = 'auto';
            } else {
                let width = element.clientWidth;
                if (width > maxWidth) {
                    maxWidth = width;

                }
                element.style.width = maxWidth + 'px';
            }

        })
    }
}



















// Маленькие действия
// Поиск
// Кнопка поделиться


// Клик по фрейму включается скролл
let frame = document.querySelectorAll('.frame3d__wrap');

for (let i = 0; i < frame.length; i++) {

    frame[i].addEventListener('click', function() {
        frame[i].querySelector('.frame3d iframe').style.pointerEvents = "auto";
    })
}

document.querySelector('.search').addEventListener('click', function(event) {
    event.stopPropagation();
    document.querySelector('.header').addEventListener('click', function(event) {
        event.stopPropagation();
    })

    function remove() {

        document.querySelector('.search').classList.remove('active');
        document.querySelector('.form-search').classList.remove('active');

    }

    document.querySelector('.search').classList.toggle('active');
    document.querySelector('.form-search').classList.toggle('active');

    if (document.querySelector('.search').classList.contains('active')) {
        document.addEventListener('click', remove)
    } else {
        document.removeEventListener('click', remove)
    }


})

if (document.querySelector('.share')) {
    document.querySelector('.share').addEventListener('click', function() {
        const shareListWidth = document.querySelector('.share__list').getBoundingClientRect().width;
        document.querySelector('.share').classList.add('active');
        document.querySelector('.share__text').style.transform = 'translate(-' + (shareListWidth - 40) + 'px, 0)';
        document.querySelector('.share__text').style.pointerEvents = 'none';
    })
}