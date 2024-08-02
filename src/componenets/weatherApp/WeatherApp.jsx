import React, { useState, useRef } from "react";
import "./style.css";

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const WeatherApp = () => {
  const api_key = "093e49f414032fdc6f76af93e60d586e";
  const [wicon, setWicon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState({
    temp: "24°C",
    location: "London",
    humidity: "64%",
    windSpeed: "18Km/hr"
  });
  const inputRef = useRef(null);

  const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        temp: `${Math.floor(data.main.temp)}°C`,
        location: data.name,
        humidity: `${data.main.humidity}%`,
        windSpeed: `${Math.floor(data.wind.speed)}km/hr`
      });

      // Set weather icon
      const iconCode = data.weather[0].icon;
      if (iconCode === "01d" || iconCode === "01n") {
        setWicon(clear_icon);
      } else if (iconCode === "02d" || iconCode === "02n") {
        setWicon(cloud_icon);
      } else if (["03d", "03n", "04d", "04n"].includes(iconCode)) {
        setWicon(drizzle_icon);
      } else if (["09d", "09n", "10d", "10n"].includes(iconCode)) {
        setWicon(rain_icon);
      } else if (iconCode === "13d" || iconCode === "13n") {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // You might want to set an error state here and display it to the user
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const city = inputRef.current.value.trim();
    if (city) {
      fetchWeatherData(city);
      inputRef.current.value = ""; // Clear input after submission
    }
  };

  return (
    <div className="container">
      <form className="top-bar" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="cityInput" 
          placeholder="Search" 
          ref={inputRef}
        />
        <button type="submit" className="search-icon">
          <img src={search_icon} alt="search" />
        </button>
      </form>
      <div className="weather-image">
        <img src={wicon} alt="weather icon" />
      </div>
      <div className="weather-temp">{weatherData.temp}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="humidity icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="wind icon" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
