const proxyurl = "https://cors-anywhere.herokuapp.com/";
const apiURL = 'https://swapi.dev/api/people/';
const promises = [];

const search = document.querySelector('.search');
const loader = document.querySelector('.loader');

const starWarsPeople = {
	async getPages(url) {
    await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        requireHeader : []
      },
    })
    .then(response => response.json())
    .then(data => {
      let pages = Math.ceil(data.count / data.results.length);
      for (var i = 0; i < pages; i++) {
        promises.push(starWarsPeople.getPeople(`${url}?page=${(i + 1)}`));
      }
      Promise.all(promises)
      .then(function(result) {
        loader.classList.remove('show');
        starWarsPeople.createTemplate(result);
      });
    })
    .catch(console.error);
  },
  getPeople(url) {
    return new Promise(function(resolve, reject) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          resolve(data.results)
        })
    });
  },
  createTemplate(data) {
    document.getElementById('introduction').classList.add('hide');

    const peoplesArr = data.flat();
    // console.log(peoplesArr);
    peoplesArr.forEach( (person, index) => {
      let number = index + 1;
      document.querySelector('.main-carousel').innerHTML += (
        `<div class="carousel-cell">
          <div class="card">
            <h2>№ ${number}</h2>
            <h2>${person.name}</h2>
            <div class="content">
              <div class="logo">
                <div class="img-wr">
                  <img src="img/people/${person.name}.png" alt="Avatar">
                </div>
              </div>
              <div class="info">
                <div class="info-block">
                  <h3>Hair color:</h3><p>${person.hair_color}</p>
                </div>
                <div class="info-block">
                  <h3>Height:</h3><p>${person.height}</p>
                </div>
                <div class="info-block">
                  <h3>Mass:</h3><p>${person.mass}</p>
                </div>
                <div class="info-block">
                  <h3>Skin color:</h3><p>${person.skin_color}</p>
                </div>	
              </div>	
            </div>
          </div>
        </div>`
      );
    });

    // initialize Slider
    starWarsPeople.initializeSlider();
  },

  initializeSlider() {
    var slider = document.querySelector('.main-carousel');
    var flkty = new Flickity( slider, {
      autoPlay: 5000,
      cellAlign: 'center',
      contain: true,
      pageDots: false,
      wrapAround: true,
      dragThreshold: 10,
    });
  }
}
search.addEventListener('click', () => {
  loader.classList.add('show');

  try {
    starWarsPeople.getPages(apiURL);
  } catch(error) {
    console.log(error);
  }
});



