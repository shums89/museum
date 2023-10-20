/*
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Thumbs } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
  //BildSlider
  let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
  if (sliders) {
    sliders.forEach(slider => {
      slider.parentElement.classList.add('swiper');
      slider.classList.add('swiper-wrapper');
      for (const slide of slider.children) {
        slide.classList.add('swiper-slide');
      }
    });
  }
}

// Инициализация слайдеров
function initSliders() {
  // Добавление классов слайдера
  // при необходимости отключить
  bildSliders();

  // Перечень слайдеров
  // Проверяем, есть ли слайдер на стронице
  if (document.querySelector('.welcome-slider__slider')) { // Указываем класс нужного слайдера
    // Создаем слайдер
    new Swiper('.welcome-slider__slider', { // Указываем класс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
      modules: [Navigation, Pagination, Autoplay],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      speed: 800,

      //touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      preloadImages: false,
      lazy: true,

      // Эффекты
      effect: 'fade',
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      // Пагинация
      pagination: {
        el: '.welcome-slider-controll__pagination',
        clickable: true,
      },

      // Скроллбар
      /*
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      */

      // Кнопки "влево/вправо"
      navigation: {
        prevEl: '.buttons-control__prev',
        nextEl: '.buttons-control__next',
      },

      // Брейкпоинты
      /*
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
          autoHeight: true,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1268: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      */
      // События
      on: {
        init: function (swiper) {
          const slider = document.querySelector('.welcome-slider__slider');
          const currentSlide = slider.querySelector('.fraction-controll__current');
          const allSlides = slider.querySelector('.fraction-controll__all');
          const allSlidesItems = slider.querySelectorAll('.welcome-slider__slide:not(.swiper-slide-duplicate)');
          currentSlide.innerHTML = `0${swiper.realIndex + 1}`.slice(-2);
          allSlides.innerHTML = `0${allSlidesItems.length}`.slice(-2);
        },
        slideChange: function (swiper) {
          const currentSlide = document.querySelector('.welcome-slider__slider').querySelector('.fraction-controll__current');
          currentSlide.innerHTML = `0${swiper.realIndex + 1}`.slice(-2);
        }
      }
    });
  }

  if (document.querySelector('.video-slider-view')) { // Указываем класс нужного слайдера
    // Создаем слайдер
    new Swiper('.video-slider-view', { // Указываем класс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
      modules: [Navigation, Pagination, Autoplay, Thumbs],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      speed: 800,

      //touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      preloadImages: false,
      lazy: true,

      thumbs: {
        swiper: '.video-slider-preview'
      },

      // Эффекты
      // effect: 'fade',
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },

      // Пагинация
      pagination: {
        el: '.video-slider-controll__pagination',
        clickable: true,
      },

      // Скроллбар
      /*
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      */

      // Кнопки "влево/вправо"
      navigation: {
        prevEl: '.video-slider-controll__prev',
        nextEl: '.video-slider-controll__next',
      },

      // Брейкпоинты
      /*
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
          autoHeight: true,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1268: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      */
      // События
      on: {
      }
    });
  }

  if (document.querySelector('.video-slider-preview')) { // Указываем класс нужного слайдера
    // Создаем слайдер
    new Swiper('.video-slider-preview', { // Указываем класс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
      modules: [],
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 0,
      // autoHeight: true,
      // speed: 800,

      //touchRatio: 0,
      //simulateTouch: false,
      // loop: true,
      // preloadImages: false,
      lazy: true,

      // Эффекты
      // effect: 'fade',
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },

      // Пагинация
      // pagination: {
      //   el: '.video-slider-controll__pagination',
      //   clickable: true,
      // },

      // Скроллбар
      /*
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      */

      // Кнопки "влево/вправо"
      // navigation: {
      //   prevEl: '.video-buttons-control__prev',
      //   nextEl: '.video-buttons-control__next',
      // },

      // Брейкпоинты
      /*
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
          autoHeight: true,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1268: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      */
      // События
      on: {
      }
    });
  }
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

window.addEventListener("load", function (e) {
  // Запуск инициализации слайдеров
  initSliders();
  // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  //initSlidersScroll();
});