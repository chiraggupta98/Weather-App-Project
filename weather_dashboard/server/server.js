const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ 
        success: false, 
        message: 'City parameter is required' 
      });
    }
    
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    const response = await axios.get(url);
 

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      windSpeed: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      timestamp: new Date().toISOString()
    };
    
    res.json({ success: true, data: weatherData });
    
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ 
        success: false, 
        message: 'City not found' 
      });
    }
    
    if (error.response && error.response.status === 401) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid API key' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching weather data' 
    });
  }
});


app.get('/api/city-suggestions', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.length < 3) {
      return res.json({ suggestions: [] });
    }
    
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
    
    const response = await axios.get(url);
    
    const suggestions = response.data.map(city => ({
      name: city.name,
      country: city.country,
      state: city.state || '',
      fullName: `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`
    }));
    
    res.json({ success: true, suggestions });
    
  } catch (error) {
    console.error('Error fetching city suggestions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching city suggestions',
      suggestions: []
    });
  }
});


app.get('/', (req, res) => {
  res.send('Weather API Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});