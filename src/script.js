let now = new Date();
function currentDate() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let suffix = now.getTime();
  if (hours > 12) {
    suffix = `p.m.`;
  } else {
    suffix = `a.m.`;
  }

  let currentDate = `${hours}:${minutes} ${suffix} `;
  return currentDate;
}

let pageDate = document.querySelector("#current-time");
patgeDate.innerHTML = currentDate();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

function showTemp(response) {
  document.querySelector("#current-time").innerHTML = response.data.dt * 1000;

  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#city-deg").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#feel").innerHTML = `FEELS LIKE: ${Math.round(
    response.data.main.feels_like
  )}°C`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `HUMIDITY: ${response.data.main.humidity}%`;
  document.querySelector("#windSpeed").innerHTML = `WIND SPEED: ${Math.round(
    response.data.wind.speed
  )} mph`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

function displayCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-name");
  let cityInput = document.querySelector("#search-input");
  cityElement.innerHTML = cityInput.value;
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let units = "metric";
  let apiKey = "90692a316047200b2e1b151cc2f865a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "90692a316047200b2e1b151cc2f865a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function retreivePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", retreivePosition);
