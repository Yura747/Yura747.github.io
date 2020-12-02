const $fasIcon = $('.fas');
const $scrollToTopBtn = $('.toTop');

// wrap each letter into span
$('.card h2').each(function() {
	$(this).html($(this).text().replace(/(\w)/g, "<span class='letter'>$&</span>"));
});

$('.filters__title').each(function() {
	$(this).html($(this).text().replace(/(\w)/g, "<span class='letter'>$&</span>"));
});

// wrap each word into span
$('.overlay__content h3, ul li').each(function() {
	$(this).html($(this).text().replace(/\w+/g, "<span class='word'>$&</span>"));
});

// letter animation
$(".letter").mouseenter(function() {
	var el = $(this);

	$(this).addClass('animated rubberBand');
	$(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		el.removeClass('animated rubberBand');
	});
});

//word animation
$(".word").mouseenter(function() {
	var el = $(this);
		$(this).addClass('animated rubberBand');
		$(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			el.removeClass('animated rubberBand');
	});
});

// change displayed style
$fasIcon.on('click', () => {
	$('.cards-list').toggleClass('hidden');
	$('.cards-table').toggleClass('active');
	$('.fas.list-btn').toggleClass('active');
	$('.fas.table-btn').toggleClass('active');

	if (localStorage.display == 'table') {
		localStorage.display = 'list';
		$fasIcon.removeClass('fa-border-all');
		$fasIcon.addClass('fa-th-list');
		$scrollToTopBtn.show();
		$('.fas.list-btn').addClass('active');
	} else {
		localStorage.display = 'table';
		$fasIcon.removeClass('fa-th-list');
		$fasIcon.addClass('fa-border-all');
		$scrollToTopBtn.hide();
		$('.fas.list-btn').removeClass('active');
	}
});

// save displayed style in LocalStorage
if (localStorage.display && localStorage.display == 'table') {
	$fasIcon.removeClass('fa-border-all');
	$fasIcon.addClass('fa-th-list');
	$('.cards-list').addClass('hidden');
	$('.cards-table').addClass('active');
	$scrollToTopBtn.hide();
	$('.fas.list-btn').removeClass('active');
	$('.fas.table-btn').addClass('active');
} else if (localStorage.display == 'list') {
	$fasIcon.removeClass('fa-border-all');
	$fasIcon.addClass('fa-th-list');
  	$('.cards-list').removeClass('hidden');
  	$('.cards-table').removeClass('active');
  	$scrollToTopBtn.show();
	$('.fas.list-btn').addClass('active');
}


//===============   Isotope   ==============
// init Isotope plugin
var $grid = $('.grid').isotope({
	itemSelector: '.grid-item',
	layoutMode: 'fitRows',
});

// bind filter button click
$('#filters').on( 'click', 'button', function() {
	var filterValue = $( this ).attr('data-filter');
	// use filterFn if matches value

	$grid.isotope({ filter: filterValue });
});

// change is-checked class on buttons
$('.button-group').each(function(i, buttonGroup) {
	var $buttonGroup = $( buttonGroup );

	$buttonGroup.on( 'click', 'button', function() {
		$buttonGroup.find('.is-checked').removeClass('is-checked');
		$( this ).addClass('is-checked');
	});
});

$(".filters-select").change(function () {
	const filterValue = this.value;

	$grid.isotope({ filter: filterValue });
});
//===============   Isotope   ==============



//===============   Table - overlay animation   ==============

//Detect Closest Edge
function closestEdge(x, y, w, h) {
	var topEdgeDist    = distMetric(x, y, w/2, 0);
	var bottomEdgeDist = distMetric(x, y, w/2, h);
	var leftEdgeDist   = distMetric(x, y, 0, h/2);
	var rightEdgeDist  = distMetric(x, y, w, h/2);

	var min = Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);

	switch (min) {
		case leftEdgeDist:
			return "left";
		case rightEdgeDist:
			return "right";
		case topEdgeDist:
			return "top";
		case bottomEdgeDist:
			return "bottom";
	}
}

//Distance Formula
function distMetric(x, y, x2, y2) {
	var xDiff = x - x2;
	var yDiff = y - y2;

	return (xDiff * xDiff) + (yDiff * yDiff);
}

var boxes = document.querySelectorAll(".grid-item__inner");

for(var i = 0; i < boxes.length; i++) {

	boxes[i].onmouseenter = function(e) {
		var rect = e.target.getBoundingClientRect();
		var x = e.clientX - rect.left; //x position within the element.
		var y = e.clientY - rect.top;  //y position within the element.
		var edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
		var overlay = this.lastElementChild.firstElementChild;
		var image = this.firstElementChild;

		switch(edge) {
			case "left":
				//tween overlay from the left
				overlay.style.top = "0%";
				overlay.style.left = "-100%";
				TweenMax.to(overlay, .5, {left: '0%'});
				TweenMax.to(image, .5, {scale: 1.2});
				break;
			case "right":
				overlay.style.top = "0%";
				overlay.style.left = "100%";
				//tween overlay from the right
				TweenMax.to(overlay, .5, {left: '0%'});
				TweenMax.to(image, .5, {scale: 1.2});
				break;
			case "top":
				overlay.style.top = "-100%";
				overlay.style.left = "0%";
				//tween overlay from the right
				TweenMax.to(overlay, .5, {top: '0%'});
				TweenMax.to(image, .5, {scale: 1.2});
				break;
			case "bottom":
				overlay.style.top = "100%";
				overlay.style.left = "0%";
				//tween overlay from the right
				TweenMax.to(overlay, .5, {top: '0%'});
				TweenMax.to(image, .5, {scale: 1.2});
				break;
		}
	};

	boxes[i].onmouseleave = function(e) {
		var rect = e.target.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		var edge = closestEdge(x,y,this.clientWidth, this.clientHeight);
		var overlay = this.lastElementChild.firstElementChild;
		var image = this.firstElementChild;

		switch(edge) {
			case "left":
				TweenMax.to(overlay, .5, {left: '-100%'});
				TweenMax.to(image, .5, {scale: 1.0});
				break;
			case "right":
				TweenMax.to(overlay, .5, {left: '100%'});
				TweenMax.to(image, .5, {scale: 1.0});
				break;
			case "top":
				TweenMax.to(overlay, .5, {top: '-100%'});
				TweenMax.to(image, .5, {scale: 1.0});
				break;
			case "bottom":
				TweenMax.to(overlay, .5, {top: '100%'});
				TweenMax.to(image, .5, {scale: 1.0});
				break;
		}
	};
}

//===============   Table - overlay animation - end  ==============


// scroll to top
$scrollToTopBtn.click( () => {
	const anchor = document.getElementById('anchor');
	anchor.scrollIntoView({behavior: 'smooth'});
});