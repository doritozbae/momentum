const playlist = [
   {      
     title: 'Aqua Caelestis',
     src: './assets/sounds/1.mp3',
     duration: '00:39'
   },  
   {      
     title: 'Ennio Morricone',
     src: './assets/sounds/2.mp3',
     duration: '01:37'
   },
   {
   title: 'River Flows In You',
   src: './assets/sounds/3.mp3',
   duration: '01:37'
   },
   {
   title: 'Summer Wind',
   src: './assets/sounds/4.mp3',
   duration: '01:50'
   }
 ]

const playlistDiv = document.querySelector('.play-list');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playBtn = document.querySelector('.play');

const soundButton = document.querySelector('.sound-button');
const soundControl = document.querySelector('.sound-progress');
const audioLength = document.querySelector('.audio-length');
const progress = document.querySelectorAll('.control-input');
const currentTimeElement = document.querySelector('.current-time');
const durationTimeElement = document.querySelector('.duration')
const songname = document.querySelector('.songname')
const more = document.querySelector('.more')
const player = document.querySelector('.player')

const audio = new Audio();
// audio.load(); 
let isPlay = false;
let currentAudio = 0;
audio.src = playlist[currentAudio].src;
// console.log(currentAudio)

playlist.forEach(item => {
   const li = document.createElement('li');
   li.classList.add('play-item');
   li.textContent = item.title;
   playlistDiv.append(li); 

// if (player.classList.contains("huge-player")){
//    const li = document.createElement('li');
//    li.classList.add('play-item');
//    const div = document.createElement("div")
//    div.classList.add('huge-player-btn')
//    li.textContent = item.title;
//    li.appendChild(div); 
//    playlistDiv.appendChild(li); 
    
// }
})


progress.forEach(item => item.addEventListener('input', function () {
   const value = this.value;
   this.style.background = `linear-gradient(to right, lightpink 0%, lightpink ${value}%, #C4C4C4 ${value}%, #C4C4C4)`;
}))


function playCurrentAudio() {
   audio.src = playlist[currentAudio].src;
   if(!isPlay) toggleBtn();
   isPlay = false;
   playAudio();
}

let playlistLi = document.querySelectorAll('.play-item');
 function playAudio() {
   if(!isPlay) {
       audio.play();
       isPlay = true;
   } 
   else {
       audio.pause();
       isPlay = false;
   }
   changePlaylistItem(currentAudio);
   audio.onended = function () {
       playNextAudio();
   };
}
playBtn.addEventListener('click', playAudio);


// toggle play icon
function toggleBtn() {
   playBtn.classList.toggle('pause');
}
playBtn.addEventListener('click', toggleBtn);



// color current audio 
function changePlaylistItem(currentAudio) {
   playlistLi.forEach((item, index) => {
       if(index == currentAudio) item.classList.add('item-active');
       else {
          item.classList.remove('item-active');
         }
   }) 
}


// prev next
function playPreviousAudio() {
   currentAudio--;
   if(currentAudio < 0) {
      currentAudio = playlist.length - 1;
   } 
   playCurrentAudio();
}

function playNextAudio() {
   currentAudio++;
   if(currentAudio > playlist.length - 1) {
      currentAudio = 0;
   }
   playCurrentAudio();
}
playPrev.addEventListener('click', playPreviousAudio);
playNext.addEventListener('click', playNextAudio);


//volume functions
function changeVolume() {
   audio.volume = soundControl.value / 100;
   if (audio.volume === 0) {
      soundButton.classList.toggle('mute');
   }
   else {
      soundButton.classList.remove('mute');
   }
}
soundControl.addEventListener('change', changeVolume);

function mute() {
   soundButton.classList.toggle('mute');
   if (soundButton.classList.contains('mute')) {
       audio.volume = 0;
       soundControl.value = 0;
       soundControl.style.background = `linear-gradient(to right, lightpink 0%, lightpink 0%, #C4C4C4 0%, #C4C4C4)`;
   }
   else {
       audio.volume = 0.4;
       soundControl.value = 40;
       soundControl.style.background = `linear-gradient(to right, lightpink 0%, lightpink 40%, #C4C4C4 40%, #C4C4C4)`;
   }
}
soundButton.addEventListener('click', mute);


//progress
function audioProgress() {
   const percent = Math.floor((audio.currentTime / audio.duration) * 100);
   audioLength.value = percent;
   audioLength.style.background = `linear-gradient(to right, lightpink 0%, lightpink ${percent}%, #C4C4C4 ${percent}%, #C4C4C4)`;
}
audio.addEventListener('timeupdate', audioProgress);

function changeProgress(e) {
   const time = (e.offsetX / audioLength.offsetWidth) * audio.duration;
   audio.currentTime = time;
}
audioLength.addEventListener('click', changeProgress);
audioLength.addEventListener('mousemove', (e) => mousedown && changeProgress(e));
let mousedown = false;
audioLength.addEventListener('mouseup', () => mousedown = false);
audioLength.addEventListener('mousedown', () => mousedown = true);


function currentTime() {
   let currentMinutes = Math.floor(audio.currentTime / 60);
   let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);

   songname.innerHTML = playlist[currentAudio].title;
   durationTimeElement.textContent =  playlist[currentAudio].duration;
   currentTimeElement.innerHTML = `0${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
}

audio.addEventListener('timeupdate', currentTime);

more.addEventListener('click', () => {
   player.classList.toggle("huge-player");
   
   // settingsList.style.display = 'block';
})

