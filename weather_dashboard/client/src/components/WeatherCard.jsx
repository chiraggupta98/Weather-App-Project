import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather }) => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weather.city}, {weather.country}</h2>
        <p className="timestamp">Last updated: {new Date(weather.timestamp).toLocaleTimeString()}</p>
      </div>
      
      <div className="weather-main">
        <div className="temperature-container">
          <h1 className="temperature">{Math.round(weather.temperature)}°C</h1>
          <p className="feels-like">Feels like: {Math.round(weather.feelsLike)}°C</p>
        </div>
        
        <div className="weather-icon">
          <img 
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
            alt={weather.description} 
          />
          <p className="weather-description">{weather.description}</p>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{weather.windSpeed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{weather.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;