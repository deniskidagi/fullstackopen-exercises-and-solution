const Country = ({countryData}) => {
    const country = countryData[0]
    const name = country.name.common
    const capital = country.capital[0]
    const area = country.area
    const languages = country.languages
    const flagUrl = country.flags.svg
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
        <p>weater data {getWeather()}</p>
       
    </div>
  )
}
export default Country