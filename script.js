"use strict";

function changeFavicon(src) {
  const link = document.createElement("link"),
    oldLink = document.getElementById("dynamic-favicon");
  link.id = "dynamic-favicon";
  link.rel = "shortcut icon";
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}

let weather = {
  apiKey: "e3caf291354af809aab8822c769739a5",
  fetchWeather: async function (city) {
    // console.log(`Fetching data from api for city: ${city}`);
    // console.log(`API Key: ${this.apiKey}`);
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    );
    const data = await response.json();
    this.displayWeather(data);
  },
  displayWeather: function (data) {
    console.log(data);
    const { name } = data;
    const [{ icon, description }] = data.weather;
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".city").textContent = "Weather in " + name;
    document.querySelector(".icon").src = iconUrl;
    document.querySelector(".description").textContent = description;
    document.querySelector(".temp").textContent = Math.round(temp) + "°C";
    document.querySelector(".humidity").textContent =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").textContent =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";

    changeFavicon(iconUrl);
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
document.querySelector(".search").addEventListener("click", function () {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
