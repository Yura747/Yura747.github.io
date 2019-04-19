
(function ($) { 


// Site on load animation
$(window).on('load', () => {
    $('.animation').removeClass('active');
    $('.preloader').addClass('draw');
    setTimeout(function() {
        $('.preloader').removeClass('draw');
        $('.preloader').addClass('scale');
    }, 2500);
    setTimeout(function() {
        $('.preloader').removeClass('scale');
    }, 4500);
    setTimeout( () => {
            // menu animation
            var items = $('nav >ul >li');
            items.css('opacity', 0);
            for (var i = 0; i < items.length; i++) {
                $(items[i]).delay(i * 200).animate({ opacity: 1 }, 400);
            }
        // -------
        $('.text-transform').addClass('active');
        $('.button').addClass('active');
        $('[data-attr="opacity"]').addClass('active');
        $('[data-attr="scale"]').addClass('active');
        setTimeout(function () {
            $('.text-transform').removeClass('active');
            $('.button').removeClass('active');
            $('[data-attr="scale"]').removeClass('active');
            $('[data-attr="opacity"]').removeClass('active');
        }, 1500);
    }, 5000)
  });


// Fullpage
var fpApi = $.fn.fullpage;
$(function() {
    var $fixedNav = $('.site-header');

    $('.fullpage-container').fullpage({
        navigation: false,
        dragAndMove: true,
        afterLoad: function(anchor, index) {
            if ( $('.preloader').hasClass('scale') || $('.preloader').hasClass('draw') ) {
                $('.animation').removeClass('active');
            } else {
                $('.animation').addClass('active');
            }
        },
        onLeave: function(prevIndex, nextIndex, direction) {

            if ( $('.animation').hasClass('active') || $('.preloader').hasClass('draw') ) {
                $('.animation').removeClass('active');
            } else {
                $('.animation').addClass('active');
            }
            
            // letters animation
            setTimeout(function() {
                anime.timeline({loop: false})
                .add({
                    targets: '.letters .letter',
                    opacity: [0,1],
                    easing: "easeInOutQuad",
                    duration: 200,
                delay: function(el, i) {
                    return 20 * (i+1)
                }
                })
                anime.timeline({loop: false})
                .add({
                targets: '.letters2 .letter',
                opacity: [0,1],
                easing: "easeInOutQuad",
                duration: 200,
                delay: function(el, i) {
                    return 20 * (i+1)
                }
                })
            }, 100);

            setTimeout(function() {
                if ( $('.section[data-index="' + nextIndex + '"]').hasClass('white') ) {
                    $fixedNav.addClass('white');
                    $('.block').addClass('active');
                    $('.water').addClass('active');
                    $('[data-attr="scale"]').addClass('active');
                    $('.button').removeClass('active');
                    $('.text-transform').removeClass('active');
                    setTimeout(function() {
                        $('.logo').addClass('black');
                    }, 300);
                } else {
                    $('.text-transform').addClass('active');
                    $('.button').addClass('active');
                    $fixedNav.removeClass('white');
                    $('.logo').removeClass('black');
                    $('.block').removeClass('active');
                    $('.water').removeClass('active');
                    $('[data-attr="scale"]').removeClass('active');
                // menu animation
                    var items = $('nav >ul >li');
                    items.css('opacity', 0);
                    for (var i = 0; i < items.length; i++) {
                        $(items[i]).delay(i * 200).animate({ opacity: 1 }, 400);
                    }
                // -------
                }
            }, 2900);
        }
    });
});



$('.letters').each(function(){
    $(this).html($(this).text().replace(/([^" ":print:]|\w)/g, "<span class='letter'>$&</span>"));
});
$('.letters2').each(function(){
    $(this).html($(this).text().replace(/([^" ":print:]|\w)/g, "<span class='letter'>$&</span>"));
});




if ($('mobile-menu-wrapper').hasClass('active')) {
    $('.hamburger').on('click', function(){
      $(this).removeClass('open');
      $('mobile-menu-wrapper').removeClass('active');
    });
}
else {
    $('.hamburger').on('click', function(){
      $(this).toggleClass('open');
      $('.mobile-menu-wrapper').toggleClass('active');
    });
    
    $('.mobile-menu-wrapper').on('click', function(){
      $(this).removeClass('active');
      $('.hamburger').removeClass('open');
    });
}

})(jQuery);