import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, currentCity}) => {
  return (
    <div className="menu-container button-container">
        <Button variant={`${setCity == "" ? "outline-warning" : "warning"}`} onClick={()=>currentCity("current")}>Current Location</Button>
        {cities.map((city)=>(<Button variant={`${setCity == city ? "outline-warning" : "warning"}`} onClick={()=>currentCity(city)}>{city}</Button>))}
    </div>
  )
}

export default WeatherButton;