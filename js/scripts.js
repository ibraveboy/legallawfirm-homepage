let slidesWrapper = document.querySelector('.slides');
let slides = document.querySelectorAll('.slide span');
let textSlider = document.querySelector('.text-slider');
let indicatorsWrapper = document.querySelector('.indicators');
let maxWidth = 0;
let index = 0;
let setIntervalId = null;

slides.forEach(slide => {
  let indicator = document.createElement('li');
  if (indicatorsWrapper) {
    indicatorsWrapper.appendChild(indicator);
  }
  if (slide.clientWidth > maxWidth) {
    maxWidth = slide.clientWidth + 30;
  }
});
let indicators = document.querySelectorAll('.indicators li');

if (textSlider && slidesWrapper) {
  textSlider.style.maxWidth = `${maxWidth}px`;
}

function indicatorClickHandler(e) {
  index = 0;
  if (typeof(setIntervalId) === 'number') {
    clearInterval(setIntervalId);
  }
  let previousElem = e.currentTarget.previousElementSibling;
  indicators.forEach(indicator => {
    indicator.classList.remove('active');
  });
  slidesWrapper.style.left = '';
  while (previousElem) {
    index ++;
    previousElem = previousElem.previousElementSibling;
  }
  e.currentTarget.classList.add('active');
  slidesWrapper.style.left = index ? `-${maxWidth * index}px` : '';
  setIntervalId = setInterval(autoSlideHandler, 5000)
}

indicators.forEach(indicator => {
  indicator.addEventListener('click', indicatorClickHandler);
});

function autoSlideHandler() {
  if (index === 0 && !parseInt(slidesWrapper.style.left, 10) && !document.querySelector('.indicators li').className.includes('active')) {
    indicators.item(index).classList.add('active');
    return;
  }
  if ((slides.length - 1) === index) {
    indicators.item(index).classList.remove('active');
    slidesWrapper.style.left = '';
    index = 0;
    indicators.item(index).classList.add('active');
    return;
  }
  indicators.item(index).classList.remove('active');
  index++;
  slidesWrapper.style.left = index ? `-${maxWidth * index}px` : '';
  indicators.item(index).classList.add('active');
}

autoSlideHandler();
setIntervalId = setInterval(autoSlideHandler, 5000);