'use strict';

let heroSlider = new Swiper(".hero__banner", {
    speed: 600,
    pagination: {
        el: ".hero__pagination",
        clickable: true
    },
});

if (heroSlider.init()) {
    let sliderNamesArray = [];
    document.querySelectorAll('.hero__slide .name')
        .forEach(name => {
        sliderNamesArray.push(name.innerHTML)
    })
    document.querySelectorAll('.hero__pagination .swiper-pagination-bullet')
        .forEach((bullet, i) =>   bullet.innerHTML = sliderNamesArray[i])
}