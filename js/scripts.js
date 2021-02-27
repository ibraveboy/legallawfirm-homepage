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
    if (window.innerWidth <= 750) {
      maxWidth = slide.clientWidth;
    } else {
      maxWidth = slide.clientWidth + 30;
    }
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

document.querySelector('.tab-title').classList.add('active');
document.querySelector('.tab-content').style.display = 'block';
let allTabTitles = document.querySelectorAll('.tab-title');
let allTabContent = document.querySelectorAll('.tab-content');
var tabIndex = 0;

function tabTitleClickHandler(e) {
  allTabTitles.item(tabIndex).classList.remove('active');
  allTabContent.item(tabIndex).style.display = '';
  tabIndex = 0;
  let prevElem = e.currentTarget.previousElementSibling;
  while (prevElem) {
    tabIndex++;
    prevElem = prevElem.previousElementSibling;
  }
  allTabTitles.item(tabIndex).classList.add('active');
  allTabContent.item(tabIndex).style.display = 'block';
}

allTabTitles.forEach(tabTitle => {
  tabTitle.addEventListener('click', tabTitleClickHandler);
});

var menuItems = document.querySelectorAll('.navbar-content li');
var menu = document.querySelector('.navbar-content .menu');
var isMenuOpen = false;
var totalHeight = 0;
menuItems.forEach(menuItem => {
  totalHeight = totalHeight + menuItem.clientHeight;
})
function menuToggleClickHandler(e) {
  var menuToggleIcon = e.currentTarget.querySelector('i');
  menuToggleIcon.classList.toggle('fa-bars');
  menuToggleIcon.classList.toggle('fa-times');
  if (isMenuOpen) {
    menu.style = '';
  } else {
    menu.style.height = `${totalHeight}px`;
    menu.style.paddingTop = '20px';
    menu.style.paddingBottom = '20px';
  }
  isMenuOpen = !isMenuOpen;
}
document.querySelector('.menu-toggle').addEventListener('click', menuToggleClickHandler);

// mtab 

document.querySelector('.mtab-title').classList.add('active');
document.querySelector('.mtab-body').style.display = 'block';
let allMTabTitles = document.querySelectorAll('.mtab-title');
let allMTabContent = document.querySelectorAll('.mtab-body');

function tabTitleClickHandler(e) {
  var activeTab = e.currentTarget;
  allMTabTitles.forEach((tabTitle, i) => {
    tabTitle.classList.remove('active');
    allMTabContent.item(i).style.display = '';
  });
  activeTab.classList.add('active');
  activeTab.nextElementSibling.style.display = 'block';
}

allMTabTitles.forEach(tabTitle => {
  tabTitle.addEventListener('click', tabTitleClickHandler);
});

//Get the button:
mybutton = document.querySelector(".back-to-top");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}