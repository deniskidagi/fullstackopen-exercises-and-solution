import { useEffect, useState } from "react"
import axios from "axios"
import SearchBar from "./components/SearchBar"

const allCountries = "https://studies.cs.helsinki.fi/restcountries/api/all"

const App = () => {
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    axios.get(allCountries)
    .then(response => setCountryData(response.data))
  }, [])
  

  return (
    <div>
      <SearchBar countryData={countryData}/>
    </div>
  )
}

export default App