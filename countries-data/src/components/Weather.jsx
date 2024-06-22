
const Weather = ({geoData}) => {
  const temp = geoData.main.temp
  return (
    <div>
        <p>{temp}</p>

    </div>
  )
}

export default Weather