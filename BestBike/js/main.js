
// initialize Slider
var slider = document.querySelector('.main-carousel');
var flkty = new Flickity( slider, {
  autoPlay: 3500,
  cellAlign: 'center',
  contain: true,
  prevNextButtons: false
});


// form
const form = document.querySelector('.form');
const name = document.getElementById('name');
const phone = document.getElementById('phone');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  // console.log(name.value, phone.value)
});

name.addEventListener('focus', () => {
  name.classList.add('focus');
});
name.addEventListener('blur', () => {
  if(!name.value) {
    name.classList.remove('focus');
  }
});
phone.addEventListener('focus', () => {
  phone.classList.add('focus');
});
phone.addEventListener('blur', () => {
  if(!phone.value) {
    phone.classList.remove('focus');
  }
});

// drop-menu 
const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  document.querySelector('.header').classList.toggle('active');
});

