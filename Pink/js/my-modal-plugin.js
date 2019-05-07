

$.fn.modal = function(options) {
	
	//Vars
	var param = $.extend({
		speed: 1
	}, options);

	$selector = this;

	// Controllers
		function modalController(target) {
			var $dataModalElement = $("[data-modal-element$=" + target + "]");
			if  (target == 'close') {
				$selector.removeClass('active');
				$selector.find('.modal-wr').removeClass('active');
				$('.overlay').removeClass('active');
			} else {
				$dataModalElement.addClass('active');
			}
		}


	// Init
	$selector.css('transition', param.speed + 's');
	// Actions
	$('[data-modal]').click(function(e) {
		e.preventDefault();
		var target = $(this).attr('data-modal');
		modalController(target);
	});


	$('.overlay').click(function() {
		$selector.removeClass('active');
		$selector.find('.modal-wr').removeClass('active');
		$('.overlay').removeClass('active');
	});


}