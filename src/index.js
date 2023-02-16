//Displaying current day and time
let now = new Date(); //this is not local time

//calculate the time/day based on timestamp from API response
function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(timestamp);
  let day = days[date.getDay()];
  let hour = date.getHours();
  let min = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  return `${day} ${hour}:${min}`;
}

//Declaring celcius temperature variables for conversion to oF when required;
let celciusTemperature = null;
let celciusTemperature_Max = null;
let celciusTemperature_Min = null;

//-----------common function for both city name search and current location search------------------------
//Display weather information after search input (whether by city name or by current location) is submitted
function showTemperature(response) {
  //extracting weather information from weather API
  let temperature = Math.round(response.data.main.temp);
  let max_temp = Math.round(response.data.main.temp_max);
  let min_temp = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  celciusTemperature = response.data.main.temp;
  celciusTemperature_Max = response.data.main.temp_max;
  celciusTemperature_Min = response.data.main.temp_min;
  //display extracted weather information from weather API to HTML
  let current_t = document.querySelector("#current-temperature");
  current_t.innerHTML = temperature;
  let max_t = document.querySelector("#max-temp");
  max_t.innerHTML = `${max_temp}`;
  let min_t = document.querySelector("#min-temp");
  min_t.innerHTML = `${min_temp}`;
  let h = document.querySelector("#humidity");
  h.innerHTML = `${humidity}`;
  let w = document.querySelector("#wind");
  w.innerHTML = `${wind}`;
  let d = document.querySelector("#description");
  d.innerHTML = description;
  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = `Last updated: ${formatDate(response.data.dt * 1000)}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//console.log(response.data.main.temp);
//console.log(response.data.main.humidity);
//console.log(response.data.wind.speed);
//console.log(response.data.weather[0].description);
//console.log(response);

//----TO BE CONTINUED----------------------------------------------
//Switch between oC and oF when clicked
function CtoFconversion(degreeC) {
  let degreeF = Math.round(((degreeC - 32) * 5) / 9);
  return degreeF;
}

function changetoC(event) {
  //change current, min and max temperature numerical value to C
  let t = document.querySelector("#current-temperature");
  t.innerHTML = Math.round(celciusTemperature);
  let c_max = document.querySelector("#max-temp");
  c_max.innerHTML = Math.round(celciusTemperature_Max);
  let c_min = document.querySelector("#min-temp");
  c_min.innerHTML = Math.round(celciusTemperature_Min);

  //change min and max temperature unit symbol and styling
  let c_symbol_max = document.querySelector("#max-temp-unit");
  c_symbol_max.innerHTML = "°C";
  let c_symbol_min = document.querySelector("#min-temp-unit");
  c_symbol_min.innerHTML = "°C";

  let c = document.querySelector("#celcius");
  c.style.color = "black";
  let f = document.querySelector("#Fahrenheit");
  f.style.color = "darkgray";
}

let c = document.querySelector("#celcius");
c.addEventListener("click", changetoC);

function changetoF(event) {
  //change current, min and max temperature numerical value to F
  let t = document.querySelector("#current-temperature");
  t.innerHTML = CtoFconversion(celciusTemperature);
  let f_max = document.querySelector("#max-temp");
  f_max.innerHTML = CtoFconversion(celciusTemperature_Max);
  let f_min = document.querySelector("#min-temp");
  f_min.innerHTML = CtoFconversion(celciusTemperature_Min);

  //change min and max temperature unit symbol and styling
  let f_symbol_max = document.querySelector("#max-temp-unit");
  f_symbol_max.innerHTML = "°F";
  let f_symbol_min = document.querySelector("#min-temp-unit");
  f_symbol_min.innerHTML = "°F";
  let f = document.querySelector("#Fahrenheit");
  f.style.color = "black";
  let c = document.querySelector("#celcius");
  c.style.color = "darkgray";
}
let f = document.querySelector("#Fahrenheit");
f.addEventListener("click", changetoF);
//
////-----------Weather by City Name-----------------------------------------------------------------------
//Call weather API by city name if input city is provided and submitted
let form_search = document.querySelector("#search-form");
function DisplayCityNameAndWeather(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search_box");
  let displayCity = document.querySelector("#city-name");

  let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
  let units = "metric";
  let api_weather_main = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl_weather = `${api_weather_main}&q=${inputCity.value}&appid=${apiKey}&units=${units}`;
  //get API by axios, handle error and call functon to display weather information
  axios
    .get(apiUrl_weather)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log(error.response.data);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        let displayCity = document.querySelector("#city-name");
        displayCity.innerHTML = "City not found";
        alert("City not found");
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    })
    .then(showTemperature);
  displayCity.innerHTML = inputCity.value;
}
//Event listening for the inout city search button to be submitted
form_search.addEventListener("submit", DisplayCityNameAndWeather);

//-----------Weather by Current Location when click OR when default-----------------------------------------------------------------------
//Converting coordinates to city name for display
function showCity(response) {
  let city_name = response.data[0].name;
  let cn = document.querySelector("#city-name");
  cn.innerHTML = city_name;
  //console.log(response.data[0].name);
  //console.log(response);
}

//Call weather API by coordinates if the current location button is clicked
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
  let units = "metric";
  let api_weather_main = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl_weather = `${api_weather_main}&lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl_weather).then(showTemperature);

  let api_geocoding_reverse_main = `http://api.openweathermap.org/geo/1.0/reverse?`;
  let apiUrl_geocoding_reverse = `${api_geocoding_reverse_main}&lat=${lat}&lon=${long}&limit=5&appid=${apiKey}`;
  axios.get(apiUrl_geocoding_reverse).then(showCity);
}

//Get current position with browser navigator
function currentlocation_by_coord() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Event listening for the current Location button to be clicked
let current_location_search = document.querySelector(
  "#current_location_button"
);
current_location_search.addEventListener("click", currentlocation_by_coord);
