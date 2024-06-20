const Country = ({country}) => {
    const name = country.name.common
    const capital = country.capital[0]
    const area = country.area
    const languages = country.languages
    const filename = name.substring(0, 2).toLowerCase();
    const flagUrl = country.flags.svg
    const url = flagUrl.substring(0, (flagUrl.toString().indexOf(".com/") + 5));
    const flagImageUrl = `${url}${filename}.svg`
  return (
    <div>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <h2>Languages</h2>
        <ul>
            {Object.keys(languages).map(key => (
                <li>{languages[key]}</li>
            ))}
        </ul>
        <img style={{maxWidth: 100}} src={flagImageUrl} alt="flag" />
       
    </div>
  )
}
export default Country