
// mobile - menu controlls
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu-wrapper');
const body = document.body;
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('menu-active');
});


// smooth page scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();

        // my --
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-active');
        hamburger.classList.remove('active');
        if ( e.target.getAttribute('href') == '#' ) return; 
        // ---

        document.querySelector(e.target.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

    });
});

// scroll on click on menu-button 
const button = document.getElementById('get-free')
button.addEventListener('click', (e) => {
    document.getElementById('get-it-free').scrollIntoView({
        behavior: 'smooth'
    });
});


//tabs
document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', function() {
        let attr = this.getAttribute('data-tab');
        document.querySelectorAll('[data-target]').forEach(img => {
            img.classList.remove('active');
            let imgAttr = img.getAttribute('data-target');
            if(imgAttr == attr) {
                img.classList.add('active')
            }
        });
    });
});









