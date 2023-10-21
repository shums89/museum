window.addEventListener('load', () => {
  const lazyObjs = document.querySelectorAll('[data-src], [data-srcset], [data-poster]');

  const updateLazyObject = arr => {
    arr.forEach(el => {
      if (el.dataset.src) {
        el.src = el.dataset.src;
      }
      if (el.dataset.srcset) {
        el.srcset = el.dataset.srcset;
      }
      if (el.dataset.poster) {
        el.poster = el.dataset.poster;
      }
    });
  };

  if (lazyObjs) {
    updateLazyObject(lazyObjs);
  }
});

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('input[type="tel"]'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  });
});

//====================================================================

import { menuClose } from './functions.js';

export const scroll = () => {
  const links = document.querySelectorAll('.menu__link');

  links.forEach(link => {
    link.addEventListener('click', () => {
      menuClose();
    });
  });
};

const closeMenuOverlay = ({ target = e.target }) => {
  if (document.documentElement.classList.contains('menu-open') && !target.closest('.menu__list')) {
    menuClose();
  }
};

document.addEventListener('click', closeMenuOverlay);
scroll();

//====================================================================

const visitingCardLinks = document.querySelectorAll('.visiting-card__link');

visitingCardLinks.forEach(link => {
  link.addEventListener('click', () => {
    const museum = {
      title: link.closest('.visiting-card__link').dataset.title,
      frameSrc: link.closest('.visiting-card__link').dataset.frameSrc,
    };
    localStorage.setItem('museum', JSON.stringify(museum));
  });
});

//====================================================================

const WITH_TABLET = 768;

const compare = document.querySelector(".compare");
const compareItems = compare.querySelectorAll(".compare__item");
const compareItemBefore = compare.querySelector(".compare__item_before");
const compareItemAfter = compare.querySelector(".compare__item_after");
const scaleToggle = compare.querySelector(".compare__scale-toggle");

window.addEventListener(`resize`, main);
scaleToggle.addEventListener('input', () => {
  compareItems.forEach(compareItem => {
    // compareItem.style.transitionDuration = '0s';
  });

  draw();
});

function draw() {
  let value = scaleToggle.value;

  if (document.body.clientWidth < WITH_TABLET) {
    compareItemBefore.style.width = '';
    compareItemAfter.style.width = '';
    compareItemAfter.style.marginLeft = '';
  } else {
    compareItemBefore.style.width = `${value}%`;

    compareItemAfter.style.width = `${100 - value}%`;
    compareItemAfter.style.marginLeft = `${value}%`;
  }
}

function main() {
  compare.classList.remove('compare--nojs');

  if (document.body.clientWidth < WITH_TABLET) {
    scaleToggle.value = 1;
    scaleToggle.max = 2;
  } else {
    scaleToggle.value = 50;
    scaleToggle.max = 100;
  }

  draw();
}

main();

//====================================================================

const videoSlider = document.querySelector('.video-slider');
const videoPlayToggle = videoSlider.querySelector('.slide-controls__play-toggle')
const videoProgressScale = videoSlider.querySelector('.slide-controls__progress-scale');
const videoVolumeToggle = videoSlider.querySelector('.slide-controls__volume-toggle');
const videoVolumeScale = videoSlider.querySelector('.slide-controls__volume-scale');
const videoFullscreenToggle = videoSlider.querySelector('.slide-controls__fullscreen-toggle');
let videoPlayer;
let videoPlayerVolumeValue;

const getGradient = (value) => `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;

const updateControls = (control, player = videoPlayer) => {
  if (!player) {
    return;
  }

  let progressValue = 0;
  let volumeValue = 0;

  switch (control) {
    case 'playIcon':
      videoPlayToggle.dataset.toggle = player.paused ? 'play' : 'pause';

    case 'volume':
      volumeValue = Math.round(player.volume * 100);
      videoVolumeScale.value = volumeValue;
      videoVolumeScale.style.background = getGradient(volumeValue);
      videoVolumeToggle.dataset.toggle = volumeValue == 0 ? 'mute' : 'volume';
      break;

    case 'progress':
      progressValue = player.currentTime / player.duration * 100 || 0;
      videoProgressScale.value = progressValue;
      videoProgressScale.style.background = getGradient(progressValue);
      break;

    case 'all':
      videoPlayToggle.dataset.toggle = player.paused ? 'play' : 'pause';
      volumeValue = Math.round(player.volume * 100);
      videoVolumeScale.value = volumeValue;
      videoVolumeScale.style.background = getGradient(volumeValue);
      videoVolumeToggle.dataset.toggle = volumeValue == 0 ? 'mute' : 'volume';
      progressValue = player.currentTime / player.duration * 100 || 0;
      videoProgressScale.value = progressValue;
      videoProgressScale.style.background = getGradient(progressValue);
  }
};

const updateVideoPlayer = (control) => {
  if (!videoPlayer) {
    return;
  }

  switch (control) {
    case 'volume':
      videoPlayer.volume = videoVolumeScale.value / 100;
      updateControls('volume');
      break;

    case 'fullscreen':
      videoPlayer.controls = document.fullscreen;
      break;

    case 'progress':
      videoPlayer.currentTime = videoProgressScale.value * videoPlayer.duration / 100;
      break;
  }
};

const addListener = () => {
  videoPlayer.addEventListener('volumechange', () => {
    updateControls('volume');
  });

  videoPlayer.addEventListener('fullscreenchange', () => {
    updateVideoPlayer('fullscreen');
  });

  videoPlayer.addEventListener('timeupdate', () => {
    updateControls('progress');
  });

  videoProgressScale.addEventListener('input', () => {
    updateVideoPlayer('progress');
  });
};

const getPlayerActive = () => {
  const videoPlayerNew = videoSlider.querySelector('.swiper-slide-active video');

  if (!videoPlayerNew) {
    return;
  }

  if (videoPlayer && videoPlayer != videoPlayerNew) {
    videoPlayer.pause();
    videoSlider.dataset.play = '';
    videoPlayer = videoPlayerNew
    updateControls('all');
  }

  videoPlayer = videoPlayerNew;
  addListener();
};

const changeVolume = () => {
  updateVideoPlayer('volume');
};

videoSlider.addEventListener('click', e => {
  const target = e.target;

  e.preventDefault();
  getPlayerActive();

  if (target.closest('.video-slider-view__slide') || target.closest('.slide-controls__play-toggle')) {
    if (videoPlayer.paused) {
      videoPlayer.play();
      videoSlider.dataset.play = 'play';
    } else {
      videoPlayer.pause();
      videoSlider.dataset.play = '';
    }
  }

  if (target.closest('.slide-controls__volume-toggle')) {
    if (videoVolumeToggle.dataset.toggle === 'volume') {
      videoPlayerVolumeValue = videoVolumeScale.value / 100;
      videoPlayer.volume = 0;
      videoVolumeScale.value = 0;
    } else {
      videoPlayer.volume = videoPlayerVolumeValue || 0;
      updateControls('volume');
    }
    updateControls('volume');
  }

  if (target.closest('.slide-controls__fullscreen-toggle')) {
    videoPlayer.requestFullscreen();
  }

  updateControls('playIcon');
});

videoVolumeScale.addEventListener('input', changeVolume);

getPlayerActive();
changeVolume();

//====================================================================

const pictureInnerContainer = document.querySelector('.gallery__picture-inner-wrapper');
const galleryPicture = pictureInnerContainer.children[0];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

pictureInnerContainer.innerHTML = '';
shuffle(Array(15).fill().map((el, i) => i + 1))
  .map((el) => {
    // const img = document.createElement('img');
    // img.src = `img/galery/galery${e}.jpg`;
    // img.alt = `galery image ${i}`;

    const elem = document.createElement('picture');
    elem.innerHTML = `<source data-srcset="img/galery/galery${el}.webp" type="image/webp">
                      <img class="gallery__picture" data-src="img/galery/galery${el}.jpg" alt="galery image">
                      `;

    pictureInnerContainer.append(elem);
  });
