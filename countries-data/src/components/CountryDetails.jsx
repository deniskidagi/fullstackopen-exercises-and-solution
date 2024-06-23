import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
const CountryDetails = ({countryData}) => {
    const [selectedCountry,  setSelectedCountry] = useState(countryData)
    const [weatherData, setWeatherData] = useState(null)
    const weather_key = import.meta.env.VITE_OPENWEATHER_API_KEY


    const country = selectedCountry[0]
    const name = country.name.common
    const capital = country.capital[0]
    const area = country.area
    const languages = country.languages
    const flagUrl = country.flags.svg
  useEffect(() => {
    if (selectedCountry[0]) {
      getWeatherData(selectedCountry[0].capitalInfo.latlng[0], selectedCountry[0].capitalInfo.latlng[1])
      };
    }, [selectedCountry]);

  const getWeatherData = (lat, long) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weather_key}&units=metric`
    axios.get(weatherUrl)
    .then(response => setWeatherData(response.data))
  };
  return (
    <div>
         <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <h2>Languages</h2>
        <ul>
            {Object.keys(languages).map(key => (
                <li key={key}>{languages[key]}</li>
            ))}
        </ul>
        <img style={{maxWidth: 100}} src={flagUrl} alt="flag" />
        {
            weatherData && 
            <div>
                <h1>wether in {name}</h1>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="" />
                <p>temperature {weatherData.main.temp} celsius</p>
                <p>wind {weatherData.wind.speed} m/s</p>
            </div>
        }
    </div>
  )
}

export default CountryDetails