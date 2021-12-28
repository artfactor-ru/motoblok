'use strict';
import * as menu from './modules/hc-offcanvas-nav';
import * as map from './modules/dealers-map';

const $ = require("jquery");
window.jQuery = $;

document.addEventListener('DOMContentLoaded', function () {
    let Nav = new hcOffcanvasNav('#mobile-menu', {
        disableAt: 1025,
        levelTitles: true,
        insertClose: true,
        labelBack: 'Назад'
    });
});

let heroSlider = new Swiper(".hero__banner", {
    speed: 600,
    breakpoints: {
        // when window width is >= 0px
        0: {
            pagination: {
                el: ".hero__pagination--mobile",
                clickable: true
            },
        },
        // when window width is >= 1025px
        1025: {
            pagination: {
                el: ".hero__pagination",
                clickable: true
            },
        }
    }
});

if (heroSlider.init()) {
    let sliderNamesArray = [];
    document.querySelectorAll('.hero__slide .name')
        .forEach(name => {
        sliderNamesArray.push(name.innerHTML)
    })
    document.querySelectorAll('.hero__pagination--desktop .swiper-pagination-bullet')
        .forEach((bullet, i) =>   bullet.innerHTML = sliderNamesArray[i])
}

$('.menu-handler-js').on('click', () => {
    $('.mega-menu').toggleClass('active')
})

let prevScrollpos = window.pageYOffset;
if (window.innerWidth <= 1024) {
    window.addEventListener('scroll', function() {
        if (pageYOffset > 120) {
            let currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                document.querySelector(".header").style.top = "0";
            } else {
                document.querySelector(".header").style.top = "-127px";
            }
            prevScrollpos = currentScrollPos;
        }
    });
}


