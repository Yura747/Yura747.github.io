
let myDataArray = [];

$(document).ready(() => {
    $(document).on("click", ".hamburger", function () {
        $(this).toggleClass("active");
        $('.side-bar').toggleClass("active");
    });

    $(document).on("click", "#change-city", () => {
        $('.request').addClass('active');
        $('.hamburger').removeClass('active');
        $('.side-bar').removeClass('active');
    }); 
    
    $(document).on("click", ".close", function () {
        $(this).parent().removeClass('active');
        $('.forecast').show();
    }); 

// ----------- Side Bar ------------------------------------
    $(document).on("click", ".dayLink", function () {
        $('.day-forecast').addClass('active');
        $('.hamburger').removeClass('active');
        $('.side-bar').removeClass('active');

        let target = $(this).attr('data-attr');

        const dayForecastArr = myDataArray.find(x => x.date === target);
        console.log(dayForecastArr);

        const iconsArray = [];
        iconsArray['01d'] = 'wi-day-sunny';
        iconsArray['01n'] = 'wi-night-clear';
        iconsArray['02d'] = 'wi-day-cloudy';
        iconsArray['02n'] = 'wi-night-alt-cloudy';
        iconsArray['03d'] = 'wi-cloudy';
        iconsArray['03n'] = 'wi-cloudy';
        iconsArray['04d'] = 'wi-day-cloudy-high';
        iconsArray['04n'] = 'wi-night-alt-cloudy-high';
        iconsArray['09d'] = 'wi-day-hail';
        iconsArray['09n'] = 'wi-night-alt-rain-wind';
        iconsArray['10d'] = 'wi-day-hail';
        iconsArray['10n'] = 'wi-night-alt-rain-wind';
        iconsArray['11d'] = 'wi-day-lightning';
        iconsArray['11n'] = 'wi-night-alt-lightning';
        iconsArray['13d'] = 'wi-day-snow';
        iconsArray['13n'] = 'wi-night-alt-snow-wind';
        iconsArray['50d'] = 'wi-fog';
        iconsArray['50n'] = 'wi-fog';

        $('.forecast').hide();
        $('.day-forecast-wr-inner').html('');
        dayForecastArr.timeList.forEach(forecast => {
            $('.day-forecast-wr-inner').append(`
            <div class="forecast-time-wr">
                <p>${forecast.time.slice(0 , 5)}</p>
                <p>${forecast.tempMin} °C / ${forecast.tempMax} °C</p>
                <i class="icon wi ${iconsArray[forecast.icon]}"></i>
            </div>`
            );
        });
    }); 

    $(document).on("click", "#show-saved-cities", function () {
        let citiesArr = JSON.parse(localStorage.getItem('citiesArr'));
        if (citiesArr == null) {
            alert('The list of cities is empty');
        } else {
            $('.saved-cities').toggleClass('active');  
        }
    });

    // Get JSON from the list of cities
    $(document).on("click", ".saved-cities p", function () {
        thisText = this.innerText;
        let city = thisText.split(' ')[0];
        let country = thisText.split(' ')[1];
        defaultCityForecast(city, country);
        $('.saved-cities').removeClass('active');  

    });

    // Clear the last city from the list
    $(document).on("click", ".btn-clear-last", () => {
        var citiesArr = JSON.parse(localStorage.getItem('citiesArr'));
        if (citiesArr.length == 1) {
            localStorage.clear();
            location.reload(true);
        } else {
            citiesArr.pop();
            localStorage.setItem('citiesArr', JSON.stringify(citiesArr));
            $('.saved-cities > p').filter(":last").remove();
        }
        updateCitiesList();
    });

    // Clear all cities from the list
    $(document).on("click", ".btn-clear-all", () => {
        location.reload(true);
        localStorage.clear();
        updateCitiesList();
    });

    // find city 
    $(document).on("click", '#find', () => {
        let city = $('#city').val().replace(/\W/g, '');
        let country = $('#country').val().replace(/\W/g, '');

        addCitytoLS(city, country);
        defaultCityForecast(city, country);
    });
});


// ----------- REQUEST -------------------
const defaultCityForecast = (city, country) => {

    let citiesArr = JSON.parse(localStorage.getItem('citiesArr'));
    if (JSON.parse(localStorage.getItem('citiesArr')) == null) {
        citiesArr = ['odessa ua'];
    }
    let lastSavedCity = citiesArr[citiesArr.length - 1];
    city = lastSavedCity.split(' ')[0];
    country = lastSavedCity.split(' ')[1];


    const myKey = '9dafff6a7dc47fe36edf291d15d93a48';
    const URLhost = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${myKey}&units=metric`;

    fetch(URLhost)
    .then(data => {
        return data.json();
    })
    .then(data => {
        generateHTML(data);
        $('.request').removeClass('active');
    })
    .catch((error) => alert(`There has been a problem with your fetch operation: ${error.message}`));

    //for 5 days
    let URLhost2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${myKey}&units=metric`;
 

    fetch(URLhost2)
    .then(data => {
        return data.json();
    })
    .then(data => {
        fiveDaysForecast(data); 
    })
    .catch((error) => alert(`There has been a problem with your fetch operation: ${error.message}`));
}
defaultCityForecast();

const fiveDaysForecast = data => {
    
    const fiveDaysArr = data.list.map(obj => {
        const date = obj['dt_txt'].split(' ');
        return {
            date: date[0],
            timeList: [
                {
                    time: date[1],
                    tempMin: obj.main.temp_min.toFixed(0),
                    tempMax: obj.main.temp_max.toFixed(0), 
                    description: obj.weather[0].description,
                    icon: obj.weather[0].icon,
                }
            ]
        }
    });
    useAnObjectsArr(fiveDaysArr);
}
const useAnObjectsArr = fiveDaysArr => {
    const arrOut = [];
    fiveDaysArr && fiveDaysArr.forEach(value => {
        const existing = arrOut.filter( (element1 ) => element1.date == value.date );
        if (existing.length) {
            let existingIndex = arrOut.indexOf(existing[0]);
            arrOut[existingIndex].timeList = arrOut[existingIndex].timeList.concat(value.timeList);
        } else {
            if(Array.isArray(value.timeList)){
                value.timeList = value.timeList
                arrOut.push(value); 
            }
        }
    });
    pushToSideBar(arrOut);
    myDataArray = arrOut;
}

const pushToSideBar = (arrOut) => {

    const arrWithoutFirstEl = arrOut.filter( (item) => item.date !== moment().format('YYYY-MM-DD') );

        // console.log(arrOut)
    const newArr = arrWithoutFirstEl.map(obj => {
        return {
            tMin: Math.min.apply(null, obj.timeList.map(item => item.tempMin)),
            tMax: Math.max.apply(null, obj.timeList.map(item => item.tempMax))
        }
    });

    const arrForSidebar = newArr.map((day, index) => {
        return {
            temp: `${day.tMin}°C / ${day.tMax}°C`,
            month: moment().add(index + 1, 'days').format('MMMM D'),
            day: moment().add(index + 1, 'days').format('dddd'),
            date: moment().add(index + 1, 'days').format('YYYY-MM-DD')
        }
    });

 const createDayForecast = () => {

        $('.side-bar').html('');
        arrForSidebar.forEach(day => {
            $('.side-bar').append(
                `<a href="#" class="dayLink" data-attr=${day.date}>
                    <div class="day">
                        <p>${day.month}</p>
                        <h3>${day.day}</h3>
                        <p>${day.temp}</p>
                    </div>
                </a>`
            );
        });    
    }
    createDayForecast();
    
}

// ------------ HTML ---------------
const generateHTML = data => {

   const cityName = data.name;
   const iconsArray = [];
    iconsArray['01d'] = 'wi-day-sunny';
    iconsArray['01n'] = 'wi-night-clear';
    iconsArray['02d'] = 'wi-day-cloudy';
    iconsArray['02n'] = 'wi-night-alt-cloudy';
    iconsArray['03d'] = 'wi-cloudy';
    iconsArray['03n'] = 'wi-cloudy';
    iconsArray['04d'] = 'wi-day-cloudy-high';
    iconsArray['04n'] = 'wi-night-alt-cloudy-high';
    iconsArray['09d'] = 'wi-day-hail';
    iconsArray['09n'] = 'wi-night-alt-rain-wind';
    iconsArray['10d'] = 'wi-day-hail';
    iconsArray['10n'] = 'wi-night-alt-rain-wind';
    iconsArray['11d'] = 'wi-day-lightning';
    iconsArray['11n'] = 'wi-night-alt-lightning';
    iconsArray['13d'] = 'wi-day-snow';
    iconsArray['13n'] = 'wi-night-alt-snow-wind';
    iconsArray['50d'] = 'wi-fog';
    iconsArray['50n'] = 'wi-fog';
 
    var temperature = data.main.temp;

    let today = moment().format('MMMM D')                  // date Ex - March 5
    let today_day_vs_time = moment().format('dddd HH:mm'); // Ex - Monday 15:00

    $('.city-name-wr p').html('');
    $('.city-name-wr .date').html('');
    $('.city-name-wr').append(`<p>${cityName}</p>`);
    $('.city-name-wr').append(`<div class="date">${today}</div>`);

    $('.icon.wi').addClass(`${iconsArray[data.weather[0]['icon']]}`);

    $('.icon-wr .time').html('');
    $('.icon-wr').append(`<div class="time">${today_day_vs_time}</div>`);

    $('.temperature').html('');
    $('.temperature').append(`<h3>${temperature.toFixed(0)}°<span>C</span></h3>`);
    $('.temperature').append(`<p>${data.weather[0].main}</p>`);

    $('.background video').html('');
    $('.background video').append(`<source src="video/${data.weather[0]['icon']}.mp4" type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">`);
    
    // change TextCOLOR on blue
    if( data.weather[0]['icon'] == '11n' || data.weather[0]['icon'] == '11d') {
        $('.card').find('.forecast i, .time').css('color', '#4d758f');
        $('.card').find('.temperature h3').css('color', '#4d758f');
        $('.card').find('.temperature p').css('color', '#4d758f');
        $('.card').find('.hamburger .line').css('background-color', '#4d758f');
    } else {
        $('.card').find('.forecast i, .time').css('color', '#fff');
        $('.card').find('.temperature h3').css('color', '#fff');
        $('.card').find('.hamburger .line').css('background-color', '#fff');
    }

}


//  Add Country in local storage
function addCitytoLS(city, country) {

    countryFromInput = $.trim(country); // remove spaces
    var locationFromInput =`${city} ${country}`;
    if (localStorage.getItem('citiesArr')) {
        var citiesArr = JSON.parse(localStorage.getItem('citiesArr'));
    } else {
        var citiesArr = [];
    }
    if (citiesArr.indexOf(locationFromInput) == -1) {
        citiesArr.push(locationFromInput);
    }   
    localStorage.setItem('citiesArr', JSON.stringify(citiesArr));
    updateCitiesList();
}

// add country to the list from local storage
function updateCitiesList() {
    var citiesArr = JSON.parse(localStorage.getItem('citiesArr'));
    $('.saved-cities p').html('');
    for (i in citiesArr) {
        $('.saved-cities').append(`<p>${citiesArr[i]}</p>`);
    }
}

updateCitiesList();

