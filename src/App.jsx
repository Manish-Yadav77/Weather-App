import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "425f5f42e21aaae0d2f94ad8dfa6edc4";

  const fetchWeather = async () => {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-gray-100 via-blue-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-6 text-center">Weather App 🌦️</h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 text-lg"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg text-lg transition-all duration-300"
          >
            Get Weather
          </button>
        </div>

        {weatherData && (
          <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 rounded-lg shadow-inner transition-all duration-300 ease-in-out">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">{weatherData.name}</h2>
            <div className="space-y-2 text-gray-700 text-lg">
              <p>🌡️ Temperature: <span className="font-semibold">{weatherData.main.temp} °C</span></p>
              <p>🌤️ Weather: <span className="capitalize font-semibold">{weatherData.weather[0].description}</span></p>
              <p>💧 Humidity: <span className="font-semibold">{weatherData.main.humidity}%</span></p>
              <p>🌬️ Wind Speed: <span className="font-semibold">{weatherData.wind.speed} m/s</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
