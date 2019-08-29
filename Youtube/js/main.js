
const list = document.querySelector('.list');
const video = document.querySelector('.video');
const open = document.querySelector('.open');
const videoInner = document.querySelector('.video__inner');

const YOUTUBE = {
  init() {
    this.load();
  },
  url: 'https://www.googleapis.com/youtube/v3/search?',
  KEY: 'AIzaSyAeedIvfAxkWBPSiFMrQDQlcAZAf5BW1Gw',
  part: 'snippet',
  type: 'video',
  maxResults: '15',
  order: 'date',
  searchFor: 'JavaScript|python -basic',
  videoCaption: 'closedCaption',
  relevanceLanguage: 'en',
  publishedAfter: '2019-08-04T00:00:00Z',
  URLhost: `${this.url}part=${this.part}&maxResults=${this.maxResults}&order=${this.order}&publishedAfter=${this.publishedAfter}&q=${this.searchFor}&relevanceLanguage=${this.relevanceLanguage}&type=${this.type}videoCaption=${this.videoCaption}&key=${this.KEY}`,
  load() {
    fetch(`${this.url}part=${this.part}&maxResults=${this.maxResults}&order=${this.order}&publishedAfter=${this.publishedAfter}&q=${this.searchFor}&relevanceLanguage=${this.relevanceLanguage}&type=${this.type}videoCaption=${this.videoCaption}&key=${this.KEY}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(data => {
      return data.json();
    })
    .then(result => {
      this.createHTML(result);
    })
    .catch((error) => alert(`There has been a problem with your fetch operation: ${error.message}`));    
  },
  createHTML(data) {
    if(data) { 
      list.innerHTML = '';
      document.querySelector('.message').style.display = 'none';
    }
    data.items.forEach( (element, number) => {
      let title = element.snippet.title;
      let date = element.snippet.publishedAt.slice(0 , 10);
      let id = element.id.videoId;
      list.innerHTML += `
      <div class="item">
        <div class="title">
          <h2>${title}</h2> 
          <p class="date">${date}</p>
          <span class="open"></span>
          <span class="number">${number+1}</span>
        </div>
        <div class="video">
          <div class="video__inner">
            <iframe class="frame" src="https://www.youtube.com/embed/${id}" allow="camera;microphone" allowfullscreen="allowfullscreen"></iframe>
          </div>
        </div>
      </div>`;
    });
    const listItems = document.getElementsByClassName('title');
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener('click', function() {
        let title = this;
            title.classList.toggle('active');
        let video = this.nextElementSibling;
            video.classList.toggle('active');
            video.scrollIntoView({behavior: 'smooth'});
        let number = this.lastElementChild;
            number.classList.toggle('active');
        let open = this.lastElementChild.previousElementSibling;
            open.classList.toggle('active');
      });
    }
  }
}

YOUTUBE.init();


