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
var cityListDiv = document.getElementById("storage-div");

var cityNameList = [];
var cityNameListArr = [];

var storedCities = [];
var cityName = "";
var cityNameOld = "";

// save in local storage and display-----------------------------------------------------

// Store searched cities in local storage
function storeCities(cityName) {
   localStorage.setItem("searchedCity", cityName);

   storedCities = localStorage.getItem("searchedCity");

   let cityBtn = document.createElement("button");
   cityNameList.push(cityName);

   if (cityNameList.length > 5) {
      cityNameList.shift();
   }
   cityName = cityNameList[cityNameList.length - 1];
   console.log("cityNameLength: " + cityNameList.length);

   if (cityName !== cityNameList[cityNameList.length - 2]) {
      if (cityNameList.length <= 4) {
         cityBtn.textContent = cityName;
         cityListDiv.append(cityBtn);
      }
   }
}

// Form Submit Handler ---------------------------------

var formSubmitHandler = function (event) {
   // prevent page from refreshing
   event.preventDefault();

   // get value from input element
   var cityInput = citySearchEl.value.trim();

   if (cityInput) {
      getWeatherData(cityInput);

      // storeCity(cityInput);

      // clear old content
      // weatherDataEl.textContent = "";
      // citySearchEl.value = "";
   } else {
      alert("Please enter city name");
   }

   cityName = cityInput;

   storeCities(cityName);
};

// collect weather data from API -------------------------------------------

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
   // console.group("lat, lon: " + lat, lon);
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
         displayForcast(data);
      });
};

// display current weather ----------------------------------------
var displayCityWeather = function (data) {
   displayCityEl.innerHTML = cityName;
   let dt = data.current.dt;
   day = new Date(dt * 1000);
   date = day.toLocaleString("en-US").split(",")[0];
   // currentDateEl.innerHTML = moment().format("mm/dd/yyyy");
   currentDateEl.innerHTML = date;

   let icon = data.current.weather[0].icon;

   iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

   currentTemp.innerHTML = data.current.temp;
   currentHumidity.innerHTML = data.current.humidity;
   currentWindSpeed.innerHTML = data.current.wind_speed;
   currentUvIndex.innerHTML = data.current.uvi;
};

// display 5-day forecast weather------------------------------------------------------------------------
var displayForcast = function (data) {
   for (let i = 1; i <= 5; i++) {
      // initials
      let date,
         day,
         dt,
         temp,
         wind,
         icon,
         humidity = "";
      // console.log("day: " + i + "===================================");

      //   get date
      dt = data.daily[i].dt;
      day = new Date(dt * 1000);
      date = day.toLocaleString("en-US").split(",")[0];
      // console.log("date: " + date);

      // get icon
      icon = data.daily[i].weather[0].icon;
      // console.log("daily icon: " + icon);

      // get Temp
      temp = data.daily[i].temp.day;
      // console.log("day Temp: " + temp);

      // get wind-speed
      wind = data.daily[i].wind_speed;
      // console.log("day wind speed: " + wind);

      // get humidity
      humidity = data.daily[i].humidity;
      // console.log("day humidity: " + humidity);

      // update forecast-day-x for each day --------------------------------------------------------

      // update HTML forecast-day div id
      let forecastDiv = "forecast-day-" + i;
      let forecastDivEl = document.getElementById(forecastDiv);
      forecastDivEl.innerHTML = ""; // clear div names

      // create 'p element' for date
      let dateEl = document.createElement("p");
      // forecastDivEl.appendChild(dateEl);
      dateEl.textContent = date;

      // create 'image element' for icon
      let iconEl = document.createElement("img");
      icon.id = "icon-forecast";
      iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // create 'p element' for temperature
      let tempEl = document.createElement("p");
      tempEl.textContent = "Temp: " + temp + " °F";

      // create 'p element' for wind-speed
      let windEl = document.createElement("p");
      windEl.textContent = "Wind: " + wind + " MPH";

      // create 'p element' for wind-speed
      let humidityEl = document.createElement("p");
      humidityEl.textContent = "Humidity: " + humidity + " %";

      // Fill the forecast box
      forecastDivEl.append(dateEl, iconEl, tempEl, windEl, humidityEl);
   }
};

// Add event listener --------------------------------------------------------------------
formEl.addEventListener("submit", formSubmitHandler);

// Load stored cities
// storeCities();
