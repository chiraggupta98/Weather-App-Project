import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoader] = useState(false);
  const suggestionContainerRef = useRef(null);

  // Handle click outside of suggestions to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionContainerRef.current && !suggestionContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch city suggestions from backend
  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoader(true);
    try {
      const response = await fetch(`http://localhost:3000/api/city-suggestions?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setSuggestions(data.suggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoader(false);
    }
  };

  // Debounce function for input
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  };

  
  const debouncedFetchSuggestions = useRef(
    debounce(fetchSuggestions, 300)
  ).current;

  const inputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    debouncedFetchSuggestions(value);
};
console.log(city);

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    setShowSuggestions(false);
    onSearch(suggestion.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setShowSuggestions(false);
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className="search-bar" ref={suggestionContainerRef}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={inputChange}
          onFocus={() => city.length >= 3 && setSuggestions.length > 0 && setShowSuggestions(true)}
        />
        <button type="submit">Search</button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.fullName}
            </li>
          ))}
        </ul>
      )}
      
      {showSuggestions && loadingSuggestions && (
        <div className="suggestions-loading">Loading suggestions...</div>
      )}
      
      {showSuggestions && !loadingSuggestions && suggestions.length === 0 && city.length >= 3 && (
        <div className="no-suggestions">No cities found</div>
      )}
    </div>
  );
};

export default SearchBar;