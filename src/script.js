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
pageDate.innerHTML = currentDate();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

function showTemp(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#city-deg").innerHTML = `${Math.round(
    celsiusTemperature
  )}°C`;
  document.querySelector("#feel").innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )}°C`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#windSpeed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} mph`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let showTemp = document.querySelector("#city-deg");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  showTemp.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let showTemp = document.querySelector("#city-deg");
  showTemp.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
            <div class="col">
              <div id="forecast-date" class="forecast-date">${day}</div>
              <img
                src="http://openweathermap.org/img/wn/50d@2x.png"
                alt=""
                width="42"
              />
              <div id="forecast-temps" class="forecast-temps">
                <span id="forecast-temp-max" class="forecast-temp-max">
                  18°
                </span>
                <span id="forecast-temp-min" class="forecast-temp-min">
                  12°
                </span>
              </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", retreivePosition);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelciusTemperature);

displayForecast();
