$( document ).ready(function(){
    $('.info-block:nth-child(n+6) .block-photo').hide();
    $('.info-block:nth-child(n+6) .block-content-wr').hide();



});


$('#block-btn').on('click', function() {
    $('#block-btn').toggleClass('active');
    $('.info-block:nth-child(n+6)').toggleClass('active');
    $('.info-block:nth-child(n+6) .block-photo').slideToggle(2000);
    $('.info-block:nth-child(n+6) .block-content-wr').slideToggle(2000);

});


  $('.photo-rotate').click(function() {
    $(this).toggleClass('aktive');
  });




AOS.init({
    once: true, 
});
setTimeout(function(){
    $('.swipe').fadeOut();
}, 3000);   


