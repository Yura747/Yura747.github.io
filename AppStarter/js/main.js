

$('.hamburger').on('click', function(){
    $(this).toggleClass('active');
    $('.mobile-menu-wrapper').toggleClass('active');
    $('body').toggleClass('menu-active ');
});


$(document).ready(function() {
    var margin = 100; 
    $("a").click(function() { 
       $('.hamburger').removeClass('active');
       $('.mobile-menu-wrapper').removeClass('active');
       $('body').removeClass('menu-active');
       window.location.hash = $(this).attr("href");

       $("html, body").animate({
          scrollTop: $($(this).attr("href")).offset().top - margin + "px" 
       }, {
          duration: 300, 
          easing: "swing"
       });
       return false;
    });
 });


 $('#get-free').on('click', function() {
    var margin = 100; 
    $("html, body").animate({
       scrollTop: $('#get-it-free').offset().top - margin + "px" 
    }, {
       duration: 300, 
       easing: "swing"
    });
    return false;
});
