const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const username = document.querySelector('.name');

const backgroundImage = document.body;
const prevSlide = document.querySelector('.slide-prev');
const nextSlide = document.querySelector('.slide-next');

let pageOption = {'lang': 'EN', 'cityDefault': 'Minsk', 'api': 'github'}; 

function showTime() {
   const today = new Date();
   
   const currentTime = today.toLocaleTimeString();
   time.textContent = currentTime;

   const options = {weekday: 'long', month: 'long', day: 'numeric'};
  let currentDate;
   if (pageOption.lang === 'RU'){
     currentDate = today.toLocaleDateString('ru-RU', options);
   }
   else if (pageOption.lang === 'EN'){
    currentDate = today.toLocaleDateString('en-US', options);
   }
   // console.log(currentDate)
   date.textContent = currentDate;
   
   setTimeout(showTime, 1000);
   getTimeOfDay();
  //  addBg();
}
showTime();

function getTimeOfDay() {
   const today = new Date();
   let hours = today.getHours();
   if (pageOption.lang === 'RU'){
    if (hours >= 0 && hours < 6) {
      greeting.textContent = 'Доброй ночи, ';
    } else if (hours >= 6 && hours < 12) {
      greeting.textContent = 'Доброе утро, ';
    } else if (hours >= 12 && hours < 18) {
      greeting.textContent = 'Добрый день, ';
    } else {
      greeting.textContent = 'Добрый вечер, ';
    }
   }

   else if (pageOption.lang === 'EN') {
   if (hours >= 0 && hours < 6) {
      greeting.textContent = 'Good Night, ';
    } else if (hours >= 6 && hours < 12) {
      greeting.textContent = 'Good Morning, ';
    } else if (hours >= 12 && hours < 18) {
      greeting.textContent = 'Good Afternoon, ';
    } else {
      greeting.textContent = 'Good Evening, ';
    }
  }
}


function setLocalStorage() {
   localStorage.setItem('name', username.value);
 }
 window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('name')) {
     username.value = localStorage.getItem('name');
   }
 }
 window.addEventListener('load', getLocalStorage)

 if (!localStorage.getItem('api')) {
  localStorage.setItem('api', 'github');
}

// console.log(api)
// let pageOption = {'lang': 'EN', 'cityDefault': 'Minsk', 'api': 'github'};


const settingApi = document.querySelectorAll('.api-settings input[name="api"]');
const settingTags = document.querySelectorAll('.api-settings input[name="tag"]');


document.addEventListener('DOMContentLoaded', () => {
  settingApi.forEach(e => {
      settingForToggles(e, 'api');
})


function settingForToggles(e, type) {
    e.checked = false;
    e.disabled = false;

    if (e.id === localStorage.getItem(type)) {
        e.checked = true;
        e.disabled = true;
    }

    if (type === 'api') {
      if (!localStorage.getItem('api')) {
        settingApi[0].checked = true;
        settingTags.forEach(item => {
            item.setAttribute('disabled', 'true');
            item.removeAttribute('checked');
            });
        };
  
        e.addEventListener('click', () => {
              // if (e.disabled) return;
              if (e.id !== 'github') {
                  settingTags.forEach(item => {
                      item.removeAttribute('disabled');
                  });
              } else if (e.id === 'github') {
                  settingTags.forEach(item => {
                      item.setAttribute('disabled', 'true');
                  });
              }
              localStorage.setItem('api', e.id);
             
              previousSlidePic('pic');
              nextSlidePic('pic');
              settingApi.forEach(item => item.disabled = false);
              e.disabled = true;
              pageOption.api = e.id;
              // var apiName = pageOption.api;
              // console.log(apiName);
              // console.log();
          });
        }
   };
});

let currentTimeOfDay = '';
function setCurrentTimeofDay() {
  const today = new Date();
  let hours = today.getHours();
  
  if (hours >= 0 && hours < 6) {
    currentTimeOfDay = 'night';
  }
  else if (hours >= 6 && hours < 12) {
    currentTimeOfDay = 'morning';
  }
  else if (hours >= 12 && hours < 18) {
    currentTimeOfDay = 'afternoon';
  }
  else {
    currentTimeOfDay = 'evening';
  }
}
setCurrentTimeofDay();

async function setBg(count) {
  const img = new Image();
  const api = await handleApi();
  img.src = api;

    img.onload = () => {   
      document.body.style.background = `url(${api}) center/cover, rgba(0, 0, 0, 0.5)`;
    } 
    img.onerror = function() {
      console.log("Ошибка");
    }
}


function handleApi() {
  let tags = [
    localStorage.getItem('animalstag') === 'true' ? 'animals' : '',
    localStorage.getItem('peopletag') === 'true' ? 'people' : '',
    localStorage.getItem('citytag') === 'true' ? 'city' : ''
].filter(e => e != '').join(',');

  const imgApi = {
    github: `https://raw.githubusercontent.com/doritozbae/stage1-tasks/assets/images/${currentTimeOfDay}/${currentSlide < 10 ? `0${currentSlide}` : currentSlide}.jpg`,
    unsplash: `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags}&client_id=z0SYtXjEwmbx1uSli2BRTpe9l9Zg2b2321MVTchwAfs`,
    flickr: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=945a04a39cec3e1be7d9d9314c050170&tags=${tags}&extras=url_l&format=json&nojsoncallback=1`
  }
  const apiName = localStorage.getItem('api');
  const api = imgApi[apiName];

  // const api = imgApi[pageOption.api] 
  // const apiName = pageOption.api;
  // console.log(apiName);
  console.log(api);
// console.log(tag);
  if(apiName === 'github') {
    return api;
  } else if(apiName === 'unsplash'){
    const img = getSplash(api)
    console.log(img);
    return img;
  } else if (apiName === 'flickr') {
    const img = getFlickr(api)
    // console.log(img);
    return img;
  }

}

async function getSplash(link) {
 const res = await fetch(link);
  const data = await res.json();
  console.log(data.urls);
  return data.urls.regular
}
async function getFlickr(link) {
  const res = await fetch(link);
  const data = await res.json();
  console.log(data);
  return data.photos.photo[currentSlide].url_l
}



const minSlide = 1;
const maxSlide = 20;
let currentSlide = 0;

function addBg() {

  function randomPic(minSlide, maxSlide) {
    let min = Math.ceil(minSlide);
    let max = Math.floor(maxSlide);
    currentSlide = Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log(currentSlide)
  }

  randomPic(minSlide, maxSlide);
  setBg();
  backgroundImage.style.backgroundSize = 'cover';


}
addBg()



function previousSlidePic(slide) {
  if (slide === 'pic') {
    setBg(localStorage.getItem('api'));
    return;
  }
  else {
  currentSlide = currentSlide - 1;

  if (currentSlide < minSlide) {
    currentSlide = maxSlide;
  }
  setBg();
  backgroundImage.style.backgroundSize = 'cover'; 
  }
}
prevSlide.addEventListener('click', previousSlidePic);


function nextSlidePic(slide) {
  if (slide === 'pic') {
    setBg(localStorage.getItem('api'));
    return;
  }

  else {
  currentSlide = currentSlide + 1;

  if (currentSlide > maxSlide) {
    currentSlide = minSlide;
  }
  setBg();
  backgroundImage.style.backgroundSize = 'cover';
  }
}
nextSlide.addEventListener('click', nextSlidePic);


// -
