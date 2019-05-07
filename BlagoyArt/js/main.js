
// initialize Slick

$('.slider').slick({
    arrows: true,
    dots: true,
});



// dropp menu 
$('#hamburger').click(function(e) {
    e.preventDefault();
     $('.desctop').toggleClass('active');
});


$('.catalog').click(function(e) {
    e.preventDefault();
    $('.drop-menu-wrapper').toggleClass('active');
    $(this).toggleClass('active');
});

$('.mobile ul li a').click(function(e) {
    e.preventDefault();
});

$('.button a').click(function(e) {
    e.preventDefault();
});

$('.loop').click(function(e) {
    e.preventDefault();
});


$(document).ready(function() {
    $('.minus').click(function () {
        var $input = $(this).parent().parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().parent().find('input');
        $input.val(parseInt($input.val()) + 1);

        if ( $input.val() >= 1000) {
            $input.val(1000);
        } 
        $input.change();
        return false;
    });
});
