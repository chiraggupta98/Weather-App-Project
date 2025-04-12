

import { useState, useEffect } from 'react';


import { Sun, Moon, Menu, X, CloudRain, Search } from 'lucide-react';


import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

 
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);

    setSearchQuery('');
  };

  return (
    <div className={`w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <CloudRain className={`h-8 w-8 mr-2 ${darkMode ? 'text-blue-300' : 'text-blue-500'}`} />
            <span className="font-bold text-xl">WeatherApp</span>
          </div>


          <div className="hidden md:flex items-center space-x-4">
          
            <a href="#dashboard" className="px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">Dashboard</a>
         

            <a href="#forecast" className="px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">Forecast</a>
           
            <a href="#maps" className="px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">Maps</a>
           
            <a href="#settings" className="px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">Settings</a>
          </div>

        
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2 px-4 pr-10 rounded-full focus:outline-none ${
                  darkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500' 
                    : 'bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-blue-400'
                }`}
              />
              <button type="submit" className="absolute right-3 top-2">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </form>
          </div>

          
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-800'
              } transition-colors duration-300 mx-2`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

       
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md focus:outline-none"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

   
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-4 space-y-1">
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <input
                  type="text"
                  placeholder="Search city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full py-2 px-4 rounded-md focus:outline-none ${
                    darkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400' 
                      : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                  }`}
                />
              </form>
              
              <a href="#dashboard" className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">Dashboard</a>
      
              <a href="#forecast" className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">Forecast</a>
            
              <a href="#maps" className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">Maps</a>
        
              <a href="#settings" className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">Settings</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}