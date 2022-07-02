// OpenWeather API
const apiKey = "452f578bc4618905835e94f0e94cfca5";

var formEl = document.querySelector("#form");
var citySearchEl = document.querySelector("#city-search");
var weatherDataEl = document.querySelector("#weather-data-div");
var searchHistoryEl = document.querySelector("#search-history");
var cityInfoEl = document.querySelector("#city-info");
var displayCityEl = document.querySelector("#display-city");
var currentDateEl = document.querySelector("#current-date");
var iconEl = document.querySelector("#icon");
var forecastEl = document.querySelector("#forecast");
var currentTemp = document.querySelector("#temperature");
var currentHumidity = document.querySelector("#humidity");
var currentWindSpeed = document.querySelector("#wind-speed");
var currentUvIndex = document.querySelector("#uv-index");

var cityName = "";
var icon = "";

var formSubmitHandler = function (event) {
   // prevent page from refreshing
   event.preventDefault();

   // get value from input element
   var cityInput = citySearchEl.value.trim();
   console.log(cityInput);

   if (cityInput) {
      getWeatherData(cityInput);

      // clear old content
      // weatherDataEl.textContent = "";
      // citySearchEl.value = "";
   } else {
      alert("Please enter city name");
   }

   cityName = cityInput;
};

var getWeatherData = function (cityName) {
   // get the current weather from weather API

   fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         getWeatherDetail(data[0].lat, data[0].lon);
      });
};

var getWeatherDetail = function (lat, lon) {
   console.group("lat, lon: " + lat, lon);
   fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
         lat +
         "&lon=" +
         lon +
         "&appid=" +
         apiKey +
         "&units=imperial"
   )
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         displayCityWeather(data);
      });
};

// display current weather
var displayCityWeather = function (data) {
   displayCityEl.innerHTML = cityName;
   currentDateEl.innerHTML = moment().format("dddd");
   icon = data.current.weather[0].icon;
   iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

   currentTemp.innerHTML = data.current.temp;
   currentHumidity.innerHTML = data.current.humidity;
   currentWindSpeed.innerHTML = data.current.wind_speed;
   currentUvIndex.innerHTML = data.current.uvi;
};

// Add event listener
formEl.addEventListener("submit", formSubmitHandler);
