import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WeatherBox } from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";
import { Container } from "react-bootstrap";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const cities = ['seoul', 'jeju', 'tokyo', 'new york'];
  const [apiError, setAPIError] = useState("");

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async(lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=44ce41d7eb124c094aa4da836cf26967&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch(err) {
      setAPIError(err.message);
      setLoading(false);
    }
    
  };

  const getWeatherByCity = async() => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=44ce41d7eb124c094aa4da836cf26967&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch(err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
    
  };

  const currentCity = (city) => {
    if(city == "current") {
      setCity("");
    } else {
      setCity(city);
    }
  }

  useEffect(() => {
    if(city == '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }    
  }, [city]);

  return (
    <div>
      {loading?
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div> : !apiError ?
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={city} currentCity={currentCity} />
        </div> : apiError }
    </div>
  );
}

export default App;
