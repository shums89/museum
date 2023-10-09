window.addEventListener('load', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyIframe = document.querySelectorAll('iframe[data-src]');

  const updateLazyObject = (arr) => {
    arr.forEach(e => {
      if (e.dataset.src) {
        e.src = e.dataset.src;
      }
    });
  };

  if (lazyImages) {
    updateLazyObject(lazyImages);
  }

  if (lazyIframe) {
    updateLazyObject(lazyIframe);
  }
});

if (document.querySelector('.filter-catalog__title')) {
  document.querySelector('.filter-catalog__title').addEventListener('click', () => {
    if (window.innerWidth < 992) {
      document.querySelector('.filter-catalog__items').classList.toggle('_active');
    }
  });
}

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
