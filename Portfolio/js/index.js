// wrap each letter into span
$('.card h2').each(function(){
  $(this).html($(this).text().replace(/(\w)/g, "<span class='letter'>$&</span>"));
});

// wrap each word into span
$('.overlay-content h3, ul li').each(function() {
    $(this).html($(this).text().replace(/\w+/g, "<span class='word'>$&</span>"));
});

// letter animation
$(".letter").mouseenter(function() {
    var el=$(this);
    $(this).addClass('animated rubberBand');
    $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function() {
        el.removeClass('animated rubberBand');
    });
});

//word animation
$(".word").mouseenter(function() {
    var el=$(this);
    $(this).addClass('animated rubberBand');
    $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function() {
        el.removeClass('animated rubberBand');
    });
});