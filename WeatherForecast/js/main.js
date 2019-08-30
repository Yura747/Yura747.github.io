
let dataArray = [];

const FORECAST = {  
  init() {
    this.defaultCityForecast();
    this.updateCitiesList();
  },
  
  // ----------- REQUEST -------------------
  defaultCityForecast(city = 'Odessa', country = 'ua') {

    const myKey = '9dafff6a7dc47fe36edf291d15d93a48';
    const URLhost = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${myKey}&units=metric`;

    fetch(URLhost)
    .then(data => {
      if (data.status == 404) {
        this.clearLastCity();
      }
      return data.json();
    })
    .then(data => {
      this.generateHTML(data);
      request.classList.remove('active');
      console.log(data);
    })
    .catch((error) => alert(`Something wrong..`));
    //for 5 days
    const URLhost2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${myKey}&units=metric`;
    fetch(URLhost2)
    .then(data => {
      return data.json();
    })
    .then(data => {
      this.fiveDaysForecast(data); 
    })
    // .catch((error) => alert(`There has been a problem with your fetch operation: ${error.message}`));
  },
  fiveDaysForecast(data) {
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
    this.useAnObjectsArr(fiveDaysArr);
  },
  useAnObjectsArr(fiveDaysArr) {
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
    this.pushToSideBar(arrOut);
    dataArray = arrOut;
  },
  pushToSideBar(arrOut) {

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
      sideBar.innerHTML = ' ';
      arrForSidebar.forEach(day => {
        sideBar.innerHTML +=
          `<a href="#" class="dayLink" data-attr=${day.date}>
            <div class="day">
              <p>${day.month}</p>
              <h3>${day.day}</h3>
              <p>${day.temp}</p>
            </div>
          </a>`;
      });    

    const dayForecast = document.querySelector('.day-forecast');
    const dayLinks = document.querySelectorAll('.dayLink');
      dayLinks.forEach(dayLink => {
        dayLink.addEventListener('click', function () {
          dayForecast.classList.add('active');
          hamburger.classList.remove('active');
          sideBar.classList.remove('active');
          let target = this.getAttribute('data-attr');
          const dayForecastArr = dataArray.find(x => x.date === target);
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

          forecast.style.display = 'none';
          const dayForecastWrInner = document.querySelector('.day-forecast-wr-inner');
          dayForecastWrInner.innerHTML = '';
            dayForecastArr.timeList.forEach(forecast => {
              dayForecastWrInner.innerHTML +=`
                <div class="forecast-time-wr">
                    <p>${forecast.time.slice(0 , 5)}</p>
                    <p>${forecast.tempMin} °C / ${forecast.tempMax} °C</p>
                    <i class="icon wi ${iconsArray[forecast.icon]}"></i>
                </div>`;
            });
        }); 
      });
    }
    createDayForecast();
    
  },
  // ------------ HTML ---------------
  generateHTML(data) {

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

    document.querySelector('.city-name-wr').innerHTML = '';
    document.querySelector('.icon-wr').innerHTML = '';
    document.querySelector('.city-name-wr').innerHTML += `
                                        <p>${cityName}</p>
                                        <div class="date">${today}</div>`;


    // document.querySelector('.icon.wi').classList.add(`${iconsArray[data.weather[0]['icon']]}`);

    // document.querySelector('.time').innerHTML = '';
    document.querySelector('.icon-wr').innerHTML += `
              <i class="icon wi ${iconsArray[data.weather[0]['icon']]}"></i>
              <div class="time">${today_day_vs_time}</div>`;

    const temperatureDIV = document.querySelector('.temperature');
    temperatureDIV.innerHTML = '';
    temperatureDIV.innerHTML+=`<h3>${temperature.toFixed(0)}°<span>C</span></h3>
                            <p>${data.weather[0].main}</p>`;

    const backgroundVideo = document.querySelector('.background video');
    backgroundVideo.innerHTML = '';
    backgroundVideo.innerHTML +=`<source src="video/${data.weather[0]['icon']}.mp4" type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">`;
    
    // change TextCOLOR on blue
    const card = document.querySelector('.card');
    if( data.weather[0]['icon'] == '11n' || data.weather[0]['icon'] == '11d' || data.weather[0]['icon'] == '01n') {
      forecast.classList.add('blue');
    } else {
      forecast.classList.remove('blue');
    }
  },
  //  Add Country in local storage
  addCitytoLS(city, country) {
    if(city && country) {
        var locationFromInput =`${city} ${country}`;
        if (localStorage.getItem('citiesArr')) {
          var citiesArr = JSON.parse(localStorage.getItem('citiesArr'));
          this.updateCitiesList();
        } else {
          var citiesArr = [];
        }
        if (citiesArr.indexOf(locationFromInput) == -1) {
            citiesArr.push(locationFromInput);
        }   
        localStorage.setItem('citiesArr', JSON.stringify(citiesArr));
    }

  },
  clearLastCity() {
    this.defaultCityForecast('Odessa', 'ua');
    var citiesArr = JSON.parse(localStorage.getItem('citiesArr'));
    if (citiesArr.length == 1) {
      localStorage.clear();
      location.reload(true);
    } else {
      citiesArr.pop();
      localStorage.setItem('citiesArr', JSON.stringify(citiesArr));
    }
    FORECAST.updateCitiesList();
  },
  // add country to the list from local storage
  updateCitiesList() {
    const citiesArr = JSON.parse(localStorage.getItem('citiesArr'));
    const savedList = document.querySelector('.saved-list');
    savedList.innerHTML = '';
    for (i in citiesArr) {
        if(i) {
          savedList.innerHTML += `<p class='savedCity'>${citiesArr[i]}</p>`;
        }
    }
  },

};


FORECAST.init();



/* _________________________________ [ Buttons ] ________________________________ */

const sideBar = document.querySelector('.side-bar');
const hamburger = document.querySelector('.hamburger');
const request = document.querySelector('.request');
const forecast = document.querySelector('.forecast');
const changeCity = document.getElementById('change-city');
hamburger.addEventListener('click', function () {
  this.classList.toggle('active');
  sideBar.classList.toggle('active');
});
changeCity.addEventListener('click', () => {
  request.classList.add('active');
  hamburger.classList.remove('active');
  sideBar.classList.remove('active');
}); 

const savedCities = document.querySelector('.saved-cities');

const close = document.querySelectorAll('.close');
close.forEach(btn => {
  btn.addEventListener('click', function () {
    request.classList.remove('active');
    document.querySelector('.day-forecast').classList.remove('active');
    savedCities.classList.remove('active');
    forecast.style.display = 'block';
  });
});

// ----------- Side Bar ------------------------------------
document.getElementById('show-saved-cities').addEventListener('click', function () {
  
  let citiesArr = JSON.parse(localStorage.getItem('citiesArr'));
  if (!citiesArr) {
    alert('The list of cities is empty');
  } else {
    savedCities.classList.toggle('active');  
  }
});

// Get JSON from the list of cities
const savedList = document.querySelector('.saved-list');
savedList.addEventListener('click', (e) => {
  thisText = e.target.innerText;
  let city = thisText.split(' ')[0];
  let country = thisText.split(' ')[1];
  savedCities.classList.remove('active');
  FORECAST.defaultCityForecast(city, country);
});

// Clear the last city from the list
const btnClearLast = document.querySelector('.btn-clear-last');
btnClearLast.addEventListener('click', () => {
  FORECAST.clearLastCity();
});

// Clear all cities from the list
document.querySelector('.btn-clear-all').addEventListener('click', () => {
  location.reload(true);
  localStorage.clear();
  FORECAST.updateCitiesList();
});

// find city 
const cityInput = document.getElementById('city');
const countryInput = document.getElementById('country');
const find_Btn = document.getElementById('find');
find_Btn.addEventListener('click', () => {
  let city = cityInput.value.replace(/\W/g, '');
  let country = countryInput.value.replace(/\W/g, '');
  FORECAST.addCitytoLS(city, country);
  FORECAST.defaultCityForecast(city, country);
  FORECAST.updateCitiesList();
});

// not allow to enter smth accept Englisch
cityInput.addEventListener('keyup', function(e){
  inputVal = this.value;
  this.value = this.value.replace(/([^a-zA-Z])/g, '');
  if(inputVal.length != 0 && inputVal.length >= 4) {
    find_Btn.removeAttribute('disabled');
  } else {
    find_Btn.setAttribute('disabled', 'disabled');
  }
});
country.addEventListener('keyup', function(e){
  this.value = this.value.replace(/([^a-zA-Z])/g, '');
});