let now = new Date();
let h4 = document.querySelector("h4");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let digits = [
  "0",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
];
let minutes = digits[now.getMinutes()];

h4.innerHTML = `${day} ${hours}:${minutes}`;

function hola(event) {
  event.preventDefault();
  let apiKey = "69982519efffa6111d051d52031f9519";
  let units = "metric";
  let city = document.querySelector("#searching").value;

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(displayWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", hola);

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector("h2");
  showTemperature.innerHTML = `${temperature}°C`;

  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector(".humi");
  showHumidity.innerHTML = `Humidity: ${humidity}%`;

  let vento = Math.round(response.data.wind.speed);
  let showVento = document.querySelector(".wind");
  showVento.innerHTML = `Wind: ${vento} m/s`;

  let description = response.data.weather[0].main;
  let showDescription = document.querySelector("h3");
  showDescription.innerHTML = description;
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

var options = {
  types: ["(cities)"],
};

var input = document.getElementById("searching");
var autocomplete = new google.maps.places.Autocomplete(input, options);

let button = document.querySelector(".gps");
button.addEventListener("click", getCurrentPosition);
