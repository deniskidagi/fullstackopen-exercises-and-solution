import { useEffect, useState } from "react"
import axios from "axios"
import Countries from "./components/Countries"
import Country from "./components/Country"
import Weather from "./components/Weather"


const weather_key = import.meta.env.VITE_OPENWEATHER_API_KEY
const allCountries = "https://studies.cs.helsinki.fi/restcountries/api/all"

const App = () => {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')
  const [search, setSearch] = useState('')
  const [countryData, setCountryData] = useState([])
  const [singleCountry, setSingleCountry] = useState([])
  const [loading, setLoading] = useState(true)
  const [geoData, setGeoData] = useState([])

  useEffect(() => {
    axios.get(allCountries)
    .then(response => setCountries(response.data))
    setLoading(false)
   
  }, [])

  if(loading){
    return (
      <div>Loading...</div>
    )
  }
  
  const handleChange = (event) => {
    setValue(event.target.value)
    setSearch(event.target.value)
    const searchedCountry = countries.filter(country => country.name.common.toLowerCase().includes(search))
    if(searchedCountry.length == 1 ){
      setSingleCountry(searchedCountry)
    } else {
      setCountryData(searchedCountry)
    }
    }

  const handleShow = (name) => {
    setCountryData(countryData.filter(country => country.name.common === name))
  }

  const showWeather = (lat, long) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weather_key}`
    axios.get(weatherUrl)
    .then(response => {
      setGeoData(response.data)
    })
}

  return (
    <div>
        find countries <input type="text" value={value} onChange={handleChange} />
        {countryData.length > 10 ?
             <p>Too many searches, specify another filter</p>: 
             countryData.map(country => (
              <Countries key={country.name.common} name={country.name.common} onShow={() => handleShow(country.name.common)}/>
        ))}
        {
        <div>
          {console.log(singleCountry)}
          {/* <Country countryData={singleCountry}/> */}
        </div>
        }

    </div>
  )
}

export default App