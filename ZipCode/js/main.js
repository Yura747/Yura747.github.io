$(function() {

var $cityList = $('.city-list');
zipCodesArr = [];



// Find added Zipcodes in the table
function findZipInTheTable() {
zipCodesArr = JSON.parse(localStorage.getItem('zipcodes'));

var t1 = $('#table'),
tableCells = $('td,th', t1),i;

	for( i=0; i<tableCells.length; i++) {
		var textInCell = tableCells[i].innerHTML;
		for( j=0; j < 100; j++) {
			// var zipCodesArr = ['99950', '35004', '90001'];
			if( textInCell == zipCodesArr[j]) {
			tableCells[i].style.backgroundColor = 'rgb(138, 44, 215)';
			}
		}
	}

}

// clear city list
$('#clear').on('click', function() { 
	localStorage.clear();
	zipCodesArr = [];
	$('.city-list').remove();
	location.reload(true)
});

//works with ONE zip code
// var t1 = $('#table'),
// tableCells = $('td,th', t1),i;

// 	for( i=0; i<tableCells.length; i++) {
// 	var textInCell = tableCells[i].innerHTML;
// 		if( textInCell == zip) {
// 		tableCells[i].style.backgroundColor = 'rgb(138, 44, 215)';
// 		}
// 	}
// }



// add Zipcode from Table into input
$('.overlay table tr td:nth-child(n+3)').on('click', function() {
	zipFromTable = $(this).text();
	$('#zipcode').val(zipFromTable);
	$('.get-city').removeAttr('disabled');
});   

// add City to the list on Doubleclick on the table cell
$('.overlay table tr td:nth-child(n+3)').on('dblclick', function() {
	zip = $(this).text();
	getCityName(zip);
	$('.get-city').removeAttr('disabled');
	$('#zipcode').val('');
});   



// Right block - Buttons
$('#link').on('click', function() {
	$('#link').addClass('active');
	$('.overlay').addClass('active');
});    

$('.close').on('click', function() {
	$('#link').removeClass('active');
	$('.overlay').removeClass('active');
}); 




// Get Citys list from locastorage
if (localStorage.getItem('cities') && localStorage.getItem('zipcodes')) {
	var cities = JSON.parse(localStorage.getItem('cities'));
	var zipCodesArr = JSON.parse(localStorage.getItem('zipcodes'));
} else {
	var cities = [];
	var zipCodesArr = [];
}


function updateCityList() {
	$cityList.html('');
	for (var i in cities) { 
		$cityList.append('<li data-attr=' + i + '>'  + cities[i] + '</li>');
		$('#clear').removeAttr('disabled');
		findZipInTheTable();
	}

		//Remove one citi from list on double click
		$('ul li').on('dblclick', function() {

			var target = $(this).attr('data-attr');
			$('#zipcode').val('');
			var cities = JSON.parse(localStorage.getItem('cities'));
			cities.splice(target,1);
			localStorage.setItem('cities', JSON.stringify(cities));

			var zipCodesArr = JSON.parse(localStorage.getItem('zipcodes'));
			zipCodesArr.splice(target,1)
			localStorage.setItem('zipcodes', JSON.stringify(zipCodesArr));
			console.log(zipCodesArr);
			location.reload(true);
		});    


		// add Zip-code to input on cklick
		$('ul li').on('click', function() {
			var target = $(this).attr('data-attr');
			var zipCodesArr = JSON.parse(localStorage.getItem('zipcodes'));
			$('#zipcode').val(zipCodesArr[target]);
			$('.get-city').removeAttr('disabled');
			$('#zipcode').removeClass('error');
		});    

}

var api = 'http://api.zippopotam.us';

function getCityName(inputVal) {

		$.getJSON(api + '/us/' + inputVal , function(data) {

			// console.log (data);
			place = data.places[0]['place name'];
			state = data.places[0].state;
			stateAbbreviation = data.places[0]['state abbreviation']
			mainInfo = place + ', ' + state + ', ' + stateAbbreviation;

			// console.log(cities);
			if (cities.indexOf(mainInfo) == -1) {
				cities.push(mainInfo);
				zipCodesArr.push(inputVal);
			} else {
				// alert('City with this Zip-code is alredy in the list')
				$('#city-in-the-list-modal').addClass('active');
			}

			localStorage.removeItem('cities');
			localStorage.removeItem('zipcodes');
			localStorage.setItem('cities', JSON.stringify(cities));
			localStorage.setItem('zipcodes', JSON.stringify(zipCodesArr));

			updateCityList();
		
		}).fail(function() {
			// alert('Something wrong');
			$('#smth-wrong').addClass('active');
		});
		
}


// Close modal
$('.btn-close-modal').on('click', function() {
	$('.modal-wrapper').removeClass('active');
});

// Save Zipcode after input
$('.get-city').click(function(e) {
	e.preventDefault();
	zip = $('#zipcode').val();
	getCityName(zip);
	// $('#zipcode').val('');
	$(this).attr('disabled', 'disabled');
});

// only numbers allowed
$("#zipcode").keyup(function(e){
	this.value = this.value.replace(/\D/g, '');
	// /\D/g or - /[^0-9\.]/g
	inputVal = $(this).val();

	// Before you add text button is disabled
	if(inputVal.length != 0 && inputVal.length >= 4) {
		$('.get-city').removeAttr('disabled');
		$('#zipcode').removeClass('error');
	} else {
		$('.get-city').attr('disabled', 'disabled');
		$('#zipcode').addClass('error');
	}
   
});



// Ctrl + C --- Clear Local Storage
document.onkeydown = function(e) {
    e = e || window.event;
    if (e.ctrlKey && e.keyCode == 67) {
		localStorage.clear();
    }
    return true;
}

  updateCityList();

});


