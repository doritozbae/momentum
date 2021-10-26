// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=f2148266b28d5d342d2ac067bd18b1c6&units=metric

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

const currentCity = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather() { 
   let curCity = currentCity.value; 
   // curCity.textContent = city;
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${curCity}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
   // const url = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
   
   const res = await fetch(url);
   const data = await res.json(); 
   // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
 
   if (!res.ok) {
      if (!curCity) {
              alert("Error. Please, enter city.");
      } else {
              alert("Error. City not found.");   
      }
      weatherIcon.className = '';
      temperature.textContent = '';
      weatherDescription.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
      localStorage.setItem('city', curCity);
      return;
  }

   weatherIcon.classList.add(`owf-${data.weather[0].id}`);
   temperature.textContent = `${Math.round(data.main.temp)}°C`;
   weatherDescription.textContent = data.weather[0].description;
   wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
   humidity.textContent = `Humidity: ${data.main.humidity}%`;
   localStorage.setItem('city', curCity);
}
currentCity.onchange = (e) => getWeather(e.target.value);

currentCity.addEventListener('change', () => {
   localStorage.setItem('isCityChanged', 'true');
   getWeather();
});

function updateWeather() {
   if (!localStorage.getItem('isCityChanged')) {
       currentCity.value = pageOption.cityDefault;
   } 
   else {
       currentCity.value = localStorage.getItem('city');
   }
}
updateWeather();
getWeather();







