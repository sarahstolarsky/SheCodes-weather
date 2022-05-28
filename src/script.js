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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let pageDate = document.querySelector("#current-time");
pageDate.innerHTML = currentDate();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `  
            <div class="col">
              <div id="forecast-date" class="forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
              />
              <div id="forecast-temps" class="forecast-temps">
                <span id="forecast-temp-max" class="forecast-temp-max">
                  ${Math.round(forecastDay.temp.max)}°C
                </br>
                <span id="forecast-temp-min" class="forecast-temp-min">
                  ${Math.round(forecastDay.temp.min)}°C
                </span>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "90692a316047200b2e1b151cc2f865a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  getForecast(response.data.coord);

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
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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

function loadCity(city) {
  let units = "metric";
  let apiKey = "90692a316047200b2e1b151cc2f865a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  loadCity(city);
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

window.onload = function () {
  loadCity("Paris");
};
