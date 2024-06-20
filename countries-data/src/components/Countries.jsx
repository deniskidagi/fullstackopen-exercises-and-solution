
const Countries = ({countries}) => {
  return (
    <div>
        <ul>
            {countries.length > 10 ?
             <p>Too many searches, specify another filter</p>: 
             countries.map(country => (
                <li key={country.name.common}>{country.name.common}</li>
            ))}
        </ul>
    </div>
  )
}

export default Countries