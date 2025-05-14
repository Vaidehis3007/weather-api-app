document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-messag");

  const API_KEY = "aaac5c293d46dad9221293bd7ba91807"; //env variables

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    // server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error(" City Not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    //unlock the display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});

// script.js
document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "aaac5c293d46dad9221293bd7ba91807"; 
  const cityInput = document.getElementById("city-input");
  const addCityBtn = document.getElementById("add-city-btn");
  const cityList = document.getElementById("city-list");
  const weatherContainer = document.getElementById("weather-container");

  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  renderCities();

  addCityBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city && !cities.includes(city)) {
      cities.push(city);
      saveCities();
      renderCities();
    }
    cityInput.value = ""; 
  });

  cityList.addEventListener("click", async (e) => {
    if (e.target.tagName === "LI") {
      const city = e.target.textContent;
      const weatherData = await fetchWeatherData(city);
      displayWeather(weatherData);
    }
  });

  function renderCities() {
    cityList.innerHTML = ""; 
    cities.forEach((city) => {
      const li = document.createElement("li");
      li.textContent = city;
      cityList.appendChild(li);
    });
  }

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      alert("City not found!");
      return;
    }
    const data = await response.json();
    return data;
  }

  function displayWeather(data) {
    weatherContainer.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
  }

  function saveCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
  }
});
