import React, { useState, useEffect, useRef } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialState, setInitialState] = useState(true);

  const search = async (city) => {
    if (!city) {
      setErrorMessage("Please enter a city name");
      setWeatherData(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=499cf9b3282adc9422c76ab650d7a8e7`
      );
      const data = await response.json();

      if (data.cod === "404") {
        throw new Error("Invalid City Name");
      }

      setWeatherData({
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        temperature: Math.round(data.main.temp - 273.15),
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        condition: data.weather[0].main,
      });
      setErrorMessage("");
      setInitialState(false);
    } catch (error) {
      setErrorMessage("Invalid City Name, Please Enter a valid city name");
      setWeatherData(null);
    }
  };

  const getWeatherMessage = (condition) => {
    switch (condition) {
      case "Rain":
        return "Don't forget to take an umbrella with you!";
      case "Clouds":
        return "It's a bit cloudy today, don't forget your sunglasses!";
      case "Clear":
        return "It's a beautiful day, enjoy the sunshine!";
      case "Snow":
        return "Brrr, it's cold outside! Don't forget your scarf and gloves!";
      case "Thunderstorm":
        return "There's a thunderstorm outside, be careful!";
      case "Haze":
        return "Visibility is reduced due to haze. Drive carefully!";
      default:
        return `Current condition is ${condition}. Keep an eye on the weather updates!`;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search(inputRef.current.value.trim());
    }
  };

  useEffect(() => {
    if (initialState) {
      setInitialState(true);
    }
  }, [initialState]);

  return (
    <div className="background-container">
      <div className="weather">
        {initialState ? (
          <div className="initial-state">
            <div className="search-bar">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for a city"
                onKeyDown={handleKeyDown}
              />
              <img
                src={search_icon}
                alt="Search Icon"
                onClick={() => search(inputRef.current.value.trim())}
              />
            </div>
            <div className="welcome-message-container">
              <p className="welcome-message">
                Don't let the weather surprise you stay ahead with our instant updates!
              </p>
              <p className="welcome-messages">
                Quick Tip: Type the City Name and hit Enter to get instant weather updates!
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="search-bar">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for a city"
                onKeyDown={handleKeyDown}
              />
              <img
                src={search_icon}
                alt="Search Icon"
                onClick={() => search(inputRef.current.value.trim())}
              />
            </div>
            {errorMessage && (
              <p className="error-message">
                {errorMessage}
              </p>
            )}
            {weatherData && (
              <div className="weather-info">
                <div className="weather-icon-container">
                  <img
                    src={weatherData.icon}
                    className="weather-icon"
                    alt="Weather Icon"
                  />
                </div>
                <p className="weather-condition">{weatherData.condition}</p>
                <p className="temp">{weatherData.temperature}°C</p>
                <p className="location">{weatherData.location}</p>
                <div className="weather-message-container">
                  <p className="weather-message">
                    {getWeatherMessage(weatherData.condition)}
                  </p>
                </div>
                <div className="weather-data">
                  <div className="col">
                    <img src={humidity_icon} alt="Humidity Icon" />
                    <div>
                      <p>{weatherData.humidity}%</p>
                      <span>Humidity</span>
                    </div>
                  </div>
                  <div className="col">
                    <img src={wind_icon} alt="Wind Speed Icon" />
                    <div>
                      <p>{weatherData.windSpeed} km/h</p>
                      <span>Wind Speed</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
