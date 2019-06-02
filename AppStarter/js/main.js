

$('.hamburger').on('click', function(){
    $(this).toggleClass('active');
    $('.mobile-menu-wrapper').toggleClass('active');
    $('body').toggleClass('menu-active ');
});