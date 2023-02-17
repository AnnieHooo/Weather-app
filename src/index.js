//Declaration of global variables
let search_form = document.querySelector("#search-form");
let apiKey = "15b6ba0523386a8a73b38b2440a74dea"; //use for API calls for OpenWeatherMap.org
let units = "metric"; //use for API calls for OpenWeatherMap.org
let celciusTemperature = null; //for conversion to oF when required
let celciusTemperature_Max = null; //for conversion to oF when required
let celciusTemperature_Min = null; //for conversion to oF when required
let forecast_max_values = [null]; //for conversion of forecast to oF when required
let forecast_min_values = [null]; //for conversion of forecast to oF when required
let nextDaysIds = [
  "next_1_day",
  "next_2_day",
  "next_3_day",
  "next_4_day",
  "next_5_day",
  "next_6_day",
  ,
];
let nextDays_MaxIds = [
  "next_1_day_max",
  "next_2_day_max",
  "next_3_day_max",
  "next_4_day_max",
  "next_5_day_max",
  "next_6_day_max",
  ,
];
let nextDays_MinIds = [
  "next_1_day_min",
  "next_2_day_min",
  "next_3_day_min",
  "next_4_day_min",
  "next_5_day_min",
  "next_6_day_min",
  ,
];
let nextDays_IconIds = [
  "next_1_day_icon",
  "next_2_day_icon",
  "next_3_day_icon",
  "next_4_day_icon",
  "next_5_day_icon",
  "next_6_day_icon",
  ,
];

let forecast_descriptions_Ids = [
  "forecast_description_1",
  "forecast_description_2",
  "forecast_description_3",
  "forecast_description_4",
  "forecast_description_5",
  "forecast_description_6",
  ,
];

let country_codes = {
  AF: "Afghanistan",
  AX: "Aland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua And Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia And Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, Democratic Republic",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: 'Cote D"Ivoire',
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island & Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic Of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle Of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KR: "Korea",
  KP: "North Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: 'Lao People"s Democratic Republic',
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia, Federated States Of",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory, Occupied",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  BL: "Saint Barthelemy",
  SH: "Saint Helena",
  KN: "Saint Kitts And Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre And Miquelon",
  VC: "Saint Vincent And Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome And Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia And Sandwich Isl.",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard And Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad And Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks And Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Vietnam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.S.",
  WF: "Wallis And Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

//calculate the time/day based on timestamp from API response
function formatDate_Current(timestamp) {
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
  let today = day; //this is going to be used in forecast
  let hour = date.getHours();
  let min = date.getMinutes();
  //Clean up display to show 08:04 instead of 8:4 for time
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  return `${day} ${hour}:${min}`;
}

function formatDate_Forecast(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let dateTime = new Date(timestamp);
  let day = days[dateTime.getDay()];
  let date = dateTime.getDate();
  let month = months[dateTime.getMonth()];
  if (date < 10) {
    date = `0${date}`;
  }
  return `${day}\n${date}/${month}`;
}

//-----------common function for both city name search and current location search------------------------
function showForecast(response) {
  for (let i = 1; i < 7; i++) {
    let forecast_min = Math.round(response.data.daily[i].temp.min);
    let forecast_max = Math.round(response.data.daily[i].temp.max);
    let nextDay_Max = document.querySelector(`#${nextDays_MaxIds[i - 1]}`);
    nextDay_Max.innerHTML = `${forecast_max}°`;
    let nextDay_Min = document.querySelector(`#${nextDays_MinIds[i - 1]}`);
    nextDay_Min.innerHTML = `${forecast_min}°`;
    forecast_max_values[i - 1] = forecast_max;
    forecast_min_values[i - 1] = forecast_min;
    let forecast_day = formatDate_Forecast(response.data.daily[i].dt * 1000);
    let forecast_description = response.data.daily[i].weather[0].description;
    let forecast_icon = response.data.daily[i].weather[0].icon;

    let nextDay = document.querySelector(`#${nextDaysIds[i - 1]}`);
    nextDay.innerHTML = forecast_day;

    let nextDay_Description = document.querySelector(
      `#${forecast_descriptions_Ids[i - 1]}`
    );
    nextDay_Description.innerHTML = forecast_description;
    let nextDat_Icon = document.querySelector(`#${nextDays_IconIds[i - 1]}`);
    nextDat_Icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecast_icon}@2x.png`
    );
  }
  console.log(forecast_max_values);
  console.log(forecast_min_values);
}

//Display weather information after search input (whether by city name or by current location) is submitted
function showTemperature(response) {
  //extracting current weather information from Current Weather API
  let country_code = response.data.sys.country;
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
  dateTime.innerHTML = `Last updated: ${formatDate_Current(
    response.data.dt * 1000
  )}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  //display country name based on city
  let country_name = country_codes[country_code];
  let country_n = document.querySelector("#country-name");
  country_n.innerHTML = country_name;

  //extracting coordinates from the input city in API response for use in calling forecast API
  let lon = response.data.coord.lon;
  let lat = response.data.coord.lat;

  //make API call for forecast next 7 days
  let api_weather_forecast_main = `https://api.openweathermap.org/data/2.5/onecall?`;
  let exclude = "hourly,minutely,current";
  let apiUrl_weather_forecast = `${api_weather_forecast_main}&lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl_weather_forecast).then(showForecast);
}
//console.log(response.data.main.temp);
//console.log(response.data.main.humidity);
//console.log(response.data.wind.speed);
//console.log(response.data.weather[0].description);
//console.log(response);

//----Switch between oC and oF when clicked----------------------------------------------
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

  //change forecast to C
  for (let i = 1; i < 7; i++) {
    let forecast_min = forecast_min_values[i - 1];
    let forecast_max = forecast_max_values[i - 1];
    let nextDay_Max = document.querySelector(`#${nextDays_MaxIds[i - 1]}`);
    nextDay_Max.innerHTML = `${forecast_max}°`;
    let nextDay_Min = document.querySelector(`#${nextDays_MinIds[i - 1]}`);
    nextDay_Min.innerHTML = `${forecast_min}°`;
  }
}

let c = document.querySelector("#celcius");
c.addEventListener("click", changetoC);

function changetoF(event) {
  //change current, min and max temperature numerical value to F
  temperature_mode = "F";
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

  //change forecast to oF
  for (let i = 1; i < 7; i++) {
    let forecast_min = CtoFconversion(forecast_min_values[i - 1]);
    let forecast_max = CtoFconversion(forecast_max_values[i - 1]);
    let nextDay_Max = document.querySelector(`#${nextDays_MaxIds[i - 1]}`);
    nextDay_Max.innerHTML = `${forecast_max}°`;
    let nextDay_Min = document.querySelector(`#${nextDays_MinIds[i - 1]}`);
    nextDay_Min.innerHTML = `${forecast_min}°`;
  }
}
let f = document.querySelector("#Fahrenheit");
f.addEventListener("click", changetoF);
//
////-----------Weather by City Name-----------------------------------------------------------------------
//Call weather API by city name if input city is provided and submitted
function DisplayCityNameAndWeather(event) {
  event.preventDefault();
  let displayCity = document.querySelector("#city-name");
  let inputCity = document.querySelector("#search_box");
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
        //add some error message here to users.
      } else {
        // Something happened in setting up the request that triggered an Error
        //add some error message here to users.
        console.log("Error", error.message);
      }
      //add some error message here to users.
      console.log(error.config);
    })
    .then(showTemperature);
  displayCity.innerHTML = inputCity.value;
}
//Event listening for the inout city search button to be submitted
let form_search = document.querySelector("#search-form");
form_search.addEventListener("submit", DisplayCityNameAndWeather);

//-----------Weather by Current Location when click OR when default-----------------------------------------------------------------------
//Converting coordinates to city name for display
function showCity(response) {
  let city_name = response.data[0].name;
  let country_code = response.data[0].country;
  let country_name = country_codes[country_code];
  let cn = document.querySelector("#city-name");
  cn.innerHTML = city_name;
  let country_n = document.querySelector("#country-name");
  country_n.innerHTML = country_name;

  //console.log(response.data[0].name);
  //console.log(response);
}

//Call weather API by coordinates if the current location button is clicked
function showPosition(position) {
  search_form.reset();
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
  let units = "metric";
  let api_weather_main = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl_weather = `${api_weather_main}&lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl_weather).then(showTemperature);

  let api_geocoding_reverse_main = `https://api.openweathermap.org/geo/1.0/reverse?`;
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

//-----------Weather forecast next 5 days-----------------------------------------------------------------------
