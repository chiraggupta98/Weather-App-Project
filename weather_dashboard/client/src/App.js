import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:3000/api/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
      
      setWeatherData(data.data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
     
      <div className="container">
        <h1>Weather Dashboard</h1>
        <SearchBar onSearch={fetchWeatherData} />
        
        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {weatherData && !loading && !error && (
          <WeatherCard weather={weatherData} />
        )}
      </div>
    </div>
  );
}

export default App;