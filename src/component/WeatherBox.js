import React from 'react'

export const WeatherBox = ({weather}) => { console.log("weather?", weather);
  return (
    <div className="weather-box">
        <h2><strong>{weather?.name}</strong></h2>
        <h1><strong>{weather?.main.temp}℃ / {weather?.main.temp*1.8+32}℉</strong></h1>
        <h3><strong>{weather?.weather[0].description}</strong></h3>
    </div>
  );
};
