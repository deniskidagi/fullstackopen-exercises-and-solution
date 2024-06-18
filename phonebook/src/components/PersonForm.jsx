import React from 'react'

const PersonForm = ({newName, number, handleSubmit, handleNameChange, handlePhoneChange}) => {
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          phone: <input value={number} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm