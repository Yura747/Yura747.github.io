
$( document ).ready(function(){

    var mouseStartPos = 0;
    var mouseEndPos = 0;

    $(window).mousedown(function(e){
      mouseStartPos = e.pageX;
      
      var mouseMove = mouseEndPos - mouseStartPos;
      var distance = Math.abs(mouseMove);
      if (distance >= 10) {
        if (mouseMove <= 0) {
          $('body').css({ 
            '-moz-user-select': 'none',
            '-o-user-select': 'none',
            '-khtml-user-select': 'none',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
          }); 
        }
      }
    });

    $(window).mouseup(function(e){
      mouseEndPos = e.pageX;

      var mouseMove = mouseEndPos - mouseStartPos;
      var distance = Math.abs(mouseMove);
  
      if (distance >= 400) {
  
          if (mouseMove >= 0) {
            console.log('right');
            $('.hamburger-wrapper').removeClass('open');
            $('mobile-menu-wrapper').removeClass('active');
          }
          else {
            console.log('left');
            $('.hamburger-wrapper').addClass('open');
            $('.mobile-menu-wrapper').addClass('active');
          }
      }
    });

        if ($('mobile-menu-wrapper').hasClass('active')) {
          $('.hamburger-wrapper').on('click', function(){
            $(this).removeClass('open');
            $('mobile-menu-wrapper').removeClass('active');
          });
        }
        else {
          $('.hamburger-wrapper').on('click', function(){
            $(this).toggleClass('open');
            $('.mobile-menu-wrapper').toggleClass('active');
          });
          
          $('.mobile-menu-wrapper').on('click', function(){
            $(this).removeClass('active');
            $('.hamburger-wrapper').removeClass('open');
          });
        }


        



    $("li a").on("click", function (e) {
        e.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
            $("html, body").animate({ scrollTop: top }, 
            {
              duration: 1000,
              easing: 'easeInCirc' 
            });
    });

   

  
});


