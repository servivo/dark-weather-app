


function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
 
  
h4.innerHTML = `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function search(city) {
  let apiKey = "69982519efffa6111d051d52031f9519";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searching");
  search(cityInputElement.value);
}


function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector("#temperature");
  showTemperature.innerHTML = `${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector(".humi");
  showHumidity.innerHTML = `Humidity: ${humidity}%`;

  let vento = Math.round(response.data.wind.speed);
  let showVento = document.querySelector(".wind");
  showVento.innerHTML = `Wind: ${vento} m/s`;

  let description = response.data.weather[0].main;
  let showDescription = document.querySelector("h3");
  showDescription.innerHTML = description;
  
let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);


getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "69982519efffa6111d051d52031f9519";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheitTemperature(event) { 
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature); }

  function displayCelsiusTemperature (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature); }
  


    function displayForecast(response) {
      let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col"><span class="days"> ${formatDay(forecastDay.dt)}</span> </br>
      
     
      
    <span class="minmax"><i class="fas fa-long-arrow-alt-up"></i> 
      </br>
    <i class="fas fa-long-arrow-alt-down"></i>  </span></div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
 
}

   function getForecast(coordinates) {
    
     let apiKey = "69982519efffa6111d051d52031f9519";
     let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
     axios.get(apiUrl).then(displayForecast);
   }

    let button = document.querySelector(".gps");
    button.addEventListener("click", getCurrentPosition);

    let celsiusTemperature = null;

    let form = document.querySelector("form");
    form.addEventListener("submit", search);

    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", displayCelsiusTemperature);

  search("New York");