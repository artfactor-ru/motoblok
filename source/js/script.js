'use strict';

const $ = require("jquery");
window.jQuery = $;

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
