function showDate (timestamp){

  let date = new Date (timestamp);
 
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[date.getMonth()]; 
  let year = date.getFullYear();
  let number = date.getDate();

  
  return `${day}, ${month} ${number}, ${year} `;
}
  
  function showUpdate(timestamp){

    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
}
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
}
  return `${hours}:${minutes}`
}


function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#country").innerHTML = response.data.sys.country;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  
  document.querySelector("#feels-like").innerHTML = 
    response.data.main.feelslike;

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
document.querySelector("#sunset").innerHTML = showUpdate(response.data.sys.sunset * 1000);
document.querySelector("#sunrise").innerHTML = showUpdate(response.data.sys.sunrise * 1000);
    
    console.log(response);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = showDate(response.data.dt * 1000); 
    
    let updateElement = document.querySelector("#update");
    updateElement.innerHTML = showUpdate(response.data.dt * 1000);
}

function searchCity(city) {
  let apiKey = "c8a7ad2645f8d69498f4e78e152d80f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;

  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c8a7ad2645f8d69498f4e78e152d80f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Bucharest");



// 2. Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

// 3.🙀Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 63;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 17;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
