import { useEffect, useState } from "react"
import axios from "axios"
import Countries from "./components/Countries"
import Country from "./components/Country"

const allCountries = "https://studies.cs.helsinki.fi/restcountries/api/all"
const singleCountry = "https://studies.cs.helsinki.fi/restcountries/api/name/finland"


const App = () => {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState(null)
  const [countryData, setCountryData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(allCountries)
    .then(response => setCountries(response.data))
  }, [])

  if(loading){
    console.log("loading....")
  }

  const handleChange = (event) => {
    setValue(event.target.value)
    setSearch(event.target.value)
    const searchedCountry = countries.filter(country => country.name.common.toLowerCase().includes(search))
    if(searchedCountry.length > 1){
      setCountryData(...searchedCountry)
    }
    else
    {
      const name = 
    }
  }

  return (
    <div>
        find countries <input type="text" value={value} onChange={handleChange} />
        {countryData && <Countries countries={countryData}/>}
        {country && <Country country={country}/>}
    </div>
  )
}

export default App