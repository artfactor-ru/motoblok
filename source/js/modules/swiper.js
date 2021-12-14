"use strict";

import Swiper, {
  Scrollbar,
  Controller,
  A11y,
  Thumbs,
  Navigation,
  EffectCoverflow,
  Pagination,
  EffectFade,
  Autoplay,
  Mousewheel,
  Keyboard,
  Lazy,
  HashNavigation,
} from "swiper";

Swiper.use([
  Scrollbar,
  Controller,
  A11y,
  Thumbs,
  EffectFade,
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
  Mousewheel,
  Keyboard,
  Lazy,
  HashNavigation,
]);

function updateSlider(slider) {
  if (slider != undefined) {
    if (Array.isArray(slider)) {
      if (slider.length != 0 || slider.length != undefined) {
        for (let i = 0; i < slider.length; i++) {
          slider[i].update();
        }
      }
    } else {
      slider.update();
    }
  }
}

// Баннеры с центрируемой картинкой
let swiperCentered = [];
document
  .querySelectorAll(".swiper-container--centered")
  .forEach((element, index) => {
    swiperCentered[index] = new Swiper(element, {
      loop: true,
      spaceBetween: 0,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      speed: 700,
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 400,
        modifier: 1,
        slideShadows: true,
      },
    });
  });

let swiperBanner;
// Варианты анимации потом удалить один
if (document.querySelector(".swiper-container--anim1")) {
  swiperBanner = new Swiper(".swiper-container--anim1", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    grabCursor: true,
    autoplay: {
      delay: 5000,
    },
    // autoHeight: true,
    centeredSlides: true,
    slidesPerView: "1",
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
}

// Все простые слайдеры как до после , отзывы
let innerSlider = [];
document.querySelectorAll(".slider__inner").forEach((element, index) => {
  const container = element.querySelector(".swiper-container");
  const prev = element.querySelector(".swiper-button-prev");
  const next = element.querySelector(".swiper-button-next");

  innerSlider[index] = new Swiper(container, {
    // loop: true,
    speed: 1500,
    spaceBetween: 10,
    autoHeight: true,
    navigation: {
      nextEl: next,
      prevEl: prev,
    },
    // grabCursor: true,
    slidesPerView: "1",
  });
});

function setMainSwiperMouseOver() {
  innerSlider.forEach((element) => {
    element.detachEvents();
  });
}

function setMainSwiperMouseOut() {
  innerSlider.forEach((element) => {
    element.attachEvents();
  });
}

// setTimeout(function() {

// Маленький слайдеры в до после
let smallSlider = [];

document
  .querySelectorAll(".news__img-wrap--slider")
  .forEach((element, index) => {
    const slider = element.querySelector(".swiper-container--small");
    const next = element.querySelector(".news__img-wrap swiper-button-next");
    const prev = element.querySelector(".news__img-wrap swiper-button-prev");
    const pagination = element.querySelector(".swiper-pagination--small");

    smallSlider[index] = new Swiper(slider, {
      loop: false,
      speed: 1500,
      // init: false,
      spaceBetween: 0,
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      pagination: {
        el: pagination,
        clickable: true,
      },

      // effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "1",
    });

    element.addEventListener("mouseover", setMainSwiperMouseOver);
    element.addEventListener("mouseout", setMainSwiperMouseOut);
  });
// }, 10)

// Слайдер в технологии с видео
let videoSlider = [];
document
  .querySelectorAll(".swiper-container--video")
  .forEach((element, index) => {
    videoSlider[index] = new Swiper(element, {
      loop: true,
      spaceBetween: 0,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      speed: 1500,
      // effect: 'coverflow',
      grabCursor: true,
      // centeredSlides: true,
      slidesPerView: "1",
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 480px
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window width is >= 640px
        1180: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });
  });

let certificatesSwiper;


  if (document.querySelector(".certificates__slider")) {
    imagesLoaded(document.querySelector(".certificates__slider"), function () {
      certificatesSwiper = new Swiper(".certificates__slider", {
        navigation: {
          nextEl: ".certificates__wrapper .swiper-button-next",
          prevEl: ".certificates__wrapper .swiper-button-prev",
        },
        speed: 1500,
        // loop: true,
        grabCursor: true,
        freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 30,
        breakpoints: {
          // when window width is >= 480px
          480: {
            slidesPerView: "auto",
            spaceBetween: 20,
          },
        },
      });
    });
}


let threeSwiper;
if (document.querySelector(".swiper-container--three-el .swiper-container")) {
  threeSwiper = new Swiper(".swiper-container--three-el .swiper-container", {
    navigation: {
      nextEl: ".swiper-container--three-el .swiper-button-next",
      prevEl: ".swiper-container--three-el .swiper-button-prev",
    },
    speed: 1500,
    grabCursor: true,
    slidesPerView: "1",
    spaceBetween: 20,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 480px
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 640px
      1180: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
}
let swiperThumbs;

if (document.querySelector(".swiper-container--thumbs")) {
  swiperThumbs = new Swiper(".swiper-container--thumbs", {
    grabCursor: true,
    spaceBetween: 28,
    slidesPerView: 4,
    speed: 1500,
    // hashNavigation: {
    //     // replaceState: true,
    //     watchState: true,
    // },
    // centeredSlidesBounds: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,

    breakpoints: {
      768: {
        slidesPerView: 10,
      },

      1180: {
        slidesPerView: 10,
      },

      1920: {
        slidesPerView: 18,
      },
    },
  });
}

let swiperHistory;
if (document.querySelector(".swiper-container--history")) {
  swiperHistory = new Swiper(".swiper-container--history", {
    grabCursor: true,
    spaceBetween: 10,
    // freeMode: true,
    speed: 1500,
    hashNavigation: {
      // replaceState: true,
      watchState: true,
    },
    navigation: {
      nextEl: ".swiper-button-next--history",
      prevEl: ".swiper-button-prev--history",
    },

    thumbs: {
      // autoScrollOffset: 2,
      swiper: swiperThumbs,
    },
  });
}

window.addEventListener("resize", function () {
  updateSlider(swiperCentered);
  updateSlider(swiperBanner);
  updateSlider(swiperHistory);
  // updateSlider(swiperThumbs)

  // updateSlider(smallSlider)
  updateSlider(innerSlider);
  updateSlider(videoSlider);
  updateSlider(certificatesSwiper);
});
