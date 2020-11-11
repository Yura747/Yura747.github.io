const $form = document.querySelector(".form");

const YOUTUBE = {

  params: {
	url: 'https://www.googleapis.com/youtube/v3/search?',
	KEY: 'AIzaSyAiFBt5vI45s1m5HKFrzpGyjcSDrnFpvhE',
	part: 'snippet',
	type: 'video',
	maxResults: '15',
	order: 'date',
	videoCaption: 'closedCaption',
	relevanceLanguage: 'en',
	publishedAfter: '2019-08-04T00:00:00Z',
  },

  getData(searchFor) {
	const { url, KEY, part, type, maxResults, order, videoCaption, relevanceLanguage, publishedAfter } = this.params;
	let $this = this;

	fetch(`${url}part=${part}&maxResults=${maxResults}&order=${order}&publishedAfter=${publishedAfter}&q=${searchFor}&relevanceLanguage=${relevanceLanguage}&type=${type}videoCaption=${videoCaption}&key=${KEY}`, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then(data => {
		return data.json();
	})
	.then(result => {
		if (result && result.error) {
			this.showMessage(result.error.message);
		} else {
			this.createHTML(result);
		}
		$form.closest(".form-wrapper").classList.remove("full");
	})
	.catch((error) => $this.showMessage(error));
  },

  createHTML(data) {
	const $list = document.querySelector('.list');

    if(data) {
		$list.innerHTML = '';
		document.querySelector('.message').style.display = 'none';
	}

	if (data.items.length) {
		data.items.forEach( (element, number) => {
			let title = element.snippet.title;
			let date = element.snippet.publishedAt.slice(0 , 10);
			let id = element.id.videoId;

			$list.innerHTML += `
			<div class="item">
				<div class="title">
				<h2>${title}</h2>
				<p class="date">${date}</p>
				<span class="plus-minus-circle"></span>
				<span class="number">${number + 1}</span>
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
				let $title = this;
				let $video = this.nextElementSibling;

				if ($title.parentElement.classList.contains("active")) {
					$title.parentElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
				} else {
					$video.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
				}

				$title.parentElement.classList.toggle('active')
			});
		}
	}
  },

  showMessage(message) {
	let $errorMesage = document.querySelector('.error-message');

	$errorMesage.innerHTML = `<p>${message}</p>`;
	$errorMesage.classList.remove("hide");
	$form.closest(".form-wrapper").classList.add("hide");
  }
}


// Search for Youtube video by Key words
$form.addEventListener("submit", function(event) {
	event.preventDefault();

	let $input = document.querySelector(".form__input");

	if ($input && $input.value !== "") {
		YOUTUBE.getData($input.value)
	}
})
