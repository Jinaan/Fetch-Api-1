const API_KEY = 'api_key=a1cc2afd9c2ba1ecae7b170af2c0d414';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
const popularity = BASE_URL + '/movie/popular?' + API_KEY;
const toprate = BASE_URL + '/movie/top_rated?' + API_KEY;

const main1 = document.getElementById('main1');
const main2 = document.getElementById('main2');
const form =  document.getElementById('form');
const search = document.getElementById('search');

var lastUrl = '';



getMovies(popularity);
getMovies(toprate);


function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        console.log(url);
        if(data.results.length !== 0){
          if(url.includes('popular')){
            showMovies(data.results);}
          else{showMovies12(data.results);}
        }else{
          if(url.includes('popular')){
            main1.innerHTML = `<h1 class="no-results">No Results Found</h1>`;}
          else{main2.innerHTML = `<h1 class="no-results">No Results Found</h1>`;}
        }
       
    })

}

// js untuk setiap movie
// mengambil data Title, poster, rating, overview, dan id dari api
function showMovies(data) {
    main1.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = ` 
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="ratingCircle ${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

                <h3 id="${id}">Overview</h3>
                ${overview}
                <br/> 
            </div>
        `

        main1.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(movie)
        })
    })
}

function showMovies12(data) {
  main2.innerHTML = '';

  data.forEach(movie => {
      const {title, poster_path, vote_average, overview, id} = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
           <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

          <div class="movie-info">
              <h3>${title}</h3>
              <span class="ratingCircle ${getColor(vote_average)}">${vote_average}</span>
          </div>

          <div class="overview">

              <h3 id="${id}">Overview</h3>
              ${overview}
              <br/> 
          </div>
      `

      main2.appendChild(movieEl);

      document.getElementById(id).addEventListener('click', () => {
        console.log(id)
        openNav(movie)
      })
  })
}

// warna rating
function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

// fungsi search bar
const addInput = document.querySelector('#search');
addInput.value = '';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const searchItem = search.value;
    
    localStorage.setItem('search', searchItem);

    window.location.href = 'index2.html';

})

/*
sumber ilmu
Movie Genres List = https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee
Set genres Movie  = https://www.themoviedb.org/talk/61e445276beaea0043e01ab7
Total Page        = https://www.themoviedb.org/talk/5be4901e9251415c7e030b55
Poster Path       = https://www.themoviedb.org/talk/5f3ef4eec175b200365ee352
*/