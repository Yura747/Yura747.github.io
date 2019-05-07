

// Menu 
function onScroll(){
	var scroll_top = $(document).scrollTop();
	$("li a").each(function(){
		var hash = $(this).attr("href");
		var target = $(hash);
		if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
			$("li").removeClass("active");
			$(this).addClass("active");
			window.location.hash = hash;
		} else {
			$(this).removeClass("active");
		}
	});
}
$(document).ready(function () {
	$(document).on("scroll", onScroll);
	$("li a").click(function(e){
		e.preventDefault();
		$(document).off("scroll");

		$("li a").removeClass("active");
		$(this).addClass("active");
		var hash = $(this).attr("href");
		var target = $(hash);
		$("html, body").animate({ scrollTop: target.offset().top }, 
		{
			duration: 'slow',
			easing: 'easeOutElastic' 
		}, 800,
		function(){
			window.location.hash = hash;
			$(document).on("scroll", onScroll);
		});
		window.location.hash = hash;
	});
});


