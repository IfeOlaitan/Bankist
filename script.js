'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//?1. Smooth scroll
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();

  section1.scrollIntoView({ behavior: 'smooth' });
});


//?2. Page Navigation
//* Solution 1
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  //console.log(el);

  el.addEventListener('click', function (e) {
    //console.log('link');
    e.preventDefault();

    //Get href
    const id = this.getAttribute('href');
    //console.log(this);
    console.log(id);
    console.log(this.href);

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

//* Solution 2
//Add an event listener to the common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault()

  //Matching strategy
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      //console.log(id);

      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});


//?3. Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', function (e) {
//   console.log('tab');

// }));

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //console.log(clicked);

  //Guard clause: if this doesnt happen, exit the function
  if (!clicked) return;

  //Remove active class
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

  //Ativate tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});



//?4. Menu Fade Animation
const nav = document.querySelector('.nav');

//const test = nav.querySelectorAll('.nav__link');
//console.log(test);

const handleHover = function (e) {
  //console.log(this, e.currentTarget);
  //console.log(e.currentTarget);
  //console.log(this === e.currentTarget); 

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //console.log(link);

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    //console.log(siblings);

    const logo = link.closest('.nav').querySelector('.nav__logo');
    //console.log(logo);

    siblings.forEach(el => {
      // if (el !== link) el.style.opacity = opacity;
      if (el !== link) el.style.opacity = this;
    });
    //logo.style.opacity = opacity;
    logo.style.opacity = this;
  }
};

//*the bind method creates a copy of the function that it is called on and the set the this keyword into the value that we pass into bind
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


//?5.Sticky nav
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);
// })

//*Intersection Observer API Explanation
/*
//Observer callbck function
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
}

//Observer options
const obsOptions = {
  root: null,
  threshold: 0.1
}

//The observer 
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

//*Application
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

//Callback function
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

//Observer options
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
}

//Observer
const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);


//?6. Reveal Sections
const allSections = document.querySelectorAll('.section');

//Callback
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve((entry.target))
}

//Observer
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})



//!Lectures
//?Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);



//const allSections = document.querySelectorAll('.section');
//console.log(allSections); //node list
//allSections.forEach(section => console.log(section));

const allButtons = document.getElementsByTagName('button');
//console.log(allButtons); //html collections

const btnClasses = document.getElementsByClassName('btn');
//console.log(btnClasses); //html collections


//?Creating and Inserting Elements
//Create element
const message = document.createElement('div');

//Add class
message.classList.add('cookie-message');

//Add text content
//message.textContent = 'We added cookied for better functionality and analytics';

//Add html
message.innerHTML = 'We added cookied for better functionality and analytics <button class="btn btn--close-cookie">Got It!</button>';

//Add the header element
//header.prepend(message);
//header.append(message);

//header.before(message);
//header.after(message);


//?Delete element
// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   message.remove();
// });


//?Manipulating styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//console.log(message.style.backgroundColor);
//console.log(message.style.color); //will not show computed style

//Computed style
console.log(getComputedStyle(message).color);
//console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';


//Root style
//document.documentElement.style.setProperty('--color-primary', 'blue');

//?Attributes
/*
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);

logo.alt = 'Changed the alt';

//Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.getAttribute('src'));
*/

//?Events
/*
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('You are reading the header');

  //Remove event listener
  h1.removeEventListener('mouseenter', alertH1);
}

h1.addEventListener('mouseenter', alertH1);
*/

//?Event propagation
//rgba(255, 255, 255)

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}), ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor(0, 255));

/*
document.querySelector('.nav__link').addEventListener('click', function (e) {
  //console.log('link 1');

  this.style.backgroundColor = 'blue';
  console.log('Link: ', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stopping event propagation
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = 'yellow';
  console.log('Container: ', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = 'orangered';
  console.log('Nav: ', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});
*/


//?DOM Travsersing
/*
const h1 = document.querySelector('h1');

//Going downwards the DOM - child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = '#fff';
h1.lastElementChild.style.color = '#000';

//Going upwards the DOM - parent
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--color-tertiary-darker)';

//Going sideways the DOM - parent
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

//?Call and apply
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  }
}

lufthansa.book(300, 'Jonas');
console.log(lufthansa.bookings);


const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: []
}

const book = lufthansa.book;


//*Call method
book.call(eurowings, 23, 'Sarah Williams');

//*Apply
const flightData = [583, 'Jon Snow'];
book.apply(eurowings, flightData);

//Better way instead of using apply
book.call(eurowings, ...flightData);

console.log(eurowings);


//*Bind method - creates a new function
const bookEW = book.bind(eurowings);
bookEW(23, 'Max Dane');

//Preset a value with bind method - Partial application
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Phil Jonas');

//Using bind with Event Listeners
const useThis = document.querySelector('.nav__logo', function () {
  console.log(this);
});

console.log(useThis);
*/


//*Testing out this keyword in an event handler
const tab1 = document.querySelector('.operations__tab--1');


// const changeBack = function (e, color) {
//   e.currentTarget.style.backgroundColor = color;
//   console.log(this);
// }

const changeBack = function (e) {
  e.currentTarget.style.backgroundColor = this;
  console.log(this);
}

tab1.addEventListener('click', changeBack.bind('#000'));