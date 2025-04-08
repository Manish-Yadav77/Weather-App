import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "425f5f42e21aaae0d2f94ad8dfa6edc4";

  const img='https://plus.unsplash.com/premium_photo-1664112065598-77832fcd9b8f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'


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
    <div
  className="w-full h-screen"
  style={{
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>


    <div className="text-center bg-transparent gap-3" >
      <h1 className="text-3xl font-bold underline">Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="rounded-lg pl-5 bg-gray-700 text-slate-780 text-xl"
      />
      <button className="text-white mt-5 bg-blue-700 rounded-lg px-5 text-xl ml-5" onClick={fetchWeather}>Get Weather</button>

      {weatherData && (
        <div className="text-white mt-10 mr-30" >
          <h2 className="text-3xl font-bold ">{weatherData.name}</h2>
          <p className="text-3xl font-bold mt-5">Temperature: {weatherData.main.temp} °C</p>
          <p className="text-3xl font-bold mt-5">Weather: {weatherData.weather[0].description}</p>
          <p className="text-3xl font-bold mt-5">Humidity: {weatherData.main.humidity}%</p>
          <p className="text-3xl font-bold mt-5">Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default App;
