import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { WiDaySunny, WiCloudy, WiRain, WiHumidity, WiStrongWind, WiNightClear } from "react-icons/wi";
import { FiSearch } from "react-icons/fi"; // Search icon
import { motion } from "framer-motion";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const weatherRes = await axios.get(`https://weather-forcast-kn0n.onrender.com/weather?city=${city}`);
      const forecastRes = await axios.get(`https://weather-forcast-kn0n.onrender.com/forecast?city=${city}`);
      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
      setError("");
    } catch (err) {
      setError("City not found or server error");
      setWeatherData(null);
      setForecastData(null);
    }
  };

  const renderWeatherIcon = (description, size = 30) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return <WiDaySunny size={size} className="icon-animate" />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <WiCloudy size={size} className="icon-animate" />;
      case "rain":
      case "shower rain":
        return <WiRain size={size} className="icon-animate" />;
      case "night clear":
        return <WiNightClear size={size} className="icon-animate" />;
      default:
        return <WiCloudy size={size} className="icon-animate" />;
    }
  };

  return (
    <div className="sky">
      <div className="sun"></div>
      <div className="moon"></div>
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud1"></div>

      <div className="App">
        <h1>🌤️ Weather Forcast</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <FiSearch className="search-icon" onClick={handleSearch} />
        </div>

        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-box"> 
          <h2 className="weather-title">{weatherData.name}, {weatherData.sys.country}</h2>
          <motion.div
            className="weather-info"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            
            <p>{renderWeatherIcon(weatherData.weather[0].description)} Temperature: {weatherData.main.temp}°C</p>
            <p>{renderWeatherIcon("few clouds")} Condition: {weatherData.weather[0].description}</p>
            <p>{<WiHumidity size={30} className="icon-animate" />} Humidity: {weatherData.main.humidity}%</p>
            <p>{<WiStrongWind size={30} className="icon-animate" />} Wind: {weatherData.wind.speed} m/s</p>
          </motion.div>
          </div>
        )}

        {forecastData && (
          <div className="forecast">
            <h3>Forecast every 3 hours</h3>
            <div className="forecast-grid">
              {forecastData.list.slice(0, 8).map((item, index) => (
                <motion.div
                  key={index}
                  className="forecast-card"
                  whileHover={{ scale: 1.05 }}
                >
                  <p>{item.dt_txt}</p>
                  <p>{item.main.temp}°C</p>
                  <p>{renderWeatherIcon(item.weather[0].description)}</p>
                  <p>{item.weather[0].description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;