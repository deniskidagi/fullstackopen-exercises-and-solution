
const Countries = ({name, onShow}) => {
  return (
    <div>
        <li>{name} 
          <button onClick={onShow}>show</button>
        </li>
    </div>
  )
}

export default Countries