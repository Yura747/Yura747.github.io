

$(document).ready(function() {

// 1st section - animation on scroll
$("#to-4th").on("click", function (e) {
    e.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $("html, body").animate({ scrollTop: top }, 
    {
        duration: 1000,
        easing: 'easeInCirc' 
    });
});


// 2nd section - initialize Slick and lightbox options
$('.slider').slick({
    arrows: true,
    dots: true,
});

lightbox.option({
    'wrapAround': true,
});



// 4th section - show block characteristics
$('#show').click(function() {
    $('.hidden-block-characteristics').toggleClass('active');
});

// 4th section - change colors
$('[data-button]').click(function() {
    var target = $(this).attr('data-button');
    var $dataElement = $("[data-element$=" + target + "]");
    
    $('.image-center').removeClass('active');
    $('.color-name').removeClass('active');
    $dataElement.addClass('active');
});

// 4th section - input text - only text allowed
$("#name").keyup(function(e){
	this.value = this.value.replace(/\d/g, '');
});

// 4th section - Modal
$('.modal-wr').modal({
    speed: 1
 });
 /* 
  data-modal="close" - Button close
  data-modal="1" - for button to open modal
  data-modal-element="1" - modal elements like overlay 
  and modal wr 

  */
//-----------------


// 1st and 4th sections - Timers
    function timer() {

            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();

            // День сброса
            var baseTime = new Date(year, month, day); 
            // Период сброса
            var period = 1*24*60*60*1000;

        function update() {
            var currentTime = new Date();
            // сколько осталось миллисекунд
            var diff = period - (currentTime - baseTime) % period;
    
            // сколько миллисекунд до конца секунды
            var millis = diff % 1000;
            diff = Math.floor(diff/1000);
    
            // сколько секунд до конца минуты
            var sec = diff % 60;
            if(sec < 10) sec = "0"+sec;
            diff = Math.floor(diff/60);
    
            // сколько минут до конца часа
            var min = diff % 60;
            if(min < 10) min = "0"+min;
            diff = Math.floor(diff/60);
    
            // сколько часов до конца дня
            var hours = diff % 24;
            if(hours < 10) hours = "0"+hours;
            var days = Math.floor(diff / 24);
    
            $('.day').html('');
            $('.hours').html('');
            $('.minutes').html('');
            $('.seconds').html('');
    
            $('.day').append(days);
            $('.hours').append(hours);
            $('.minutes').append(min);
            $('.seconds').append(sec);
    
            setTimeout(update, millis);
        }
        setTimeout(update, 0);
    }
    
    timer();

});

