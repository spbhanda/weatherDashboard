// OpenWeather API
const apiKey = "452f578bc4618905835e94f0e94cfca5";

var formEl = document.querySelector("#form");
var citySearchEl = document.querySelector("#city-search");
var weatherDataEl = document.querySelector("#weather-data-div");
var searchHistoryEl = document.querySelector("#search-history");
var cityInfoEl = document.querySelector("#city-infor");
var displayCityEl = document.querySelector("#display-city");
var currentDateEl = document.querySelector("#current-date");
var iconEl = document.querySelector("#icon");
var forecastEl = document.querySelector("#forecast");

var formSubmitHandler = function (event) {
   // prevent page from refreshing
   event.preventDefault();

   // get value from input element
   var cityInput = citySearchEl.value.trim();
   console.log(cityInput);

   if (cityInput) {
      getWeatherData(cityInput);

      // clear old content
      weatherDataEl.textContent = "";
      citySearchEl.value = "";
   } else {
      alert("Please enter city name");
   }
};

var getWeatherData = function (cityName) {
   // get the current weather from weather API

   fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey)
      .then(function (response) {
         console.log("response: " + response);
         return response.json();
      })
      .then(function (data) {
         console.log(data);
         getWeatherDetail(data[0].lat, data[0].lon);
      });
};

var getWeatherDetail = function (lat, lon) {
   console.group("lat, lon: " + lat, lon);
}; 

// Add event listener
formEl.addEventListener("submit", formSubmitHandler);
