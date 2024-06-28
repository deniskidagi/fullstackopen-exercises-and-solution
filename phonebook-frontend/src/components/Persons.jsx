import React from 'react'

const Persons = ({name, number, onDelete}) => {
  return (
    <div>
      <p>{name} : {number}  <button onClick={onDelete}>Delete</button></p>
    </div>
  )
}

export default Persons