// initialize Tiny-slider

var slider = tns({
    container: '.my-slider',
    slideBy: 'page',
    autoplay: false,
    center: true,
    mouseDrag: true,
    "autoplay": true,
    "autoplayTimeout": 3000,
    "autoplayHoverPause": true,
    'autoplayButtonOutput': false
  });

  // init AOS
  AOS.init();



// #login - Click function
login.onclick = (e) => {
    e.preventDefault();
};

// .btn - Click function
document.addEventListener('click', (e) => {

	// If the clicked element doesn't have the right selector, bail
	if (!e.target.matches('.button-black')) return;

	// Don't follow the link
	e.preventDefault();

}, false);

// .btn - Click function
document.addEventListener('click', (e) => {

	// If the clicked element doesn't have the right selector, bail
	if (!e.target.matches('.btn')) return;

	// Don't follow the link
	e.preventDefault();

}, false);


// hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
});