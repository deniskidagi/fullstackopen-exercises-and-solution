import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  },[])

  const addContact = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: number
    }
    const foundUser = persons.find(person => person.name === nameObject.name)
    if(foundUser)
    {
      alert(`${nameObject.name} already exists in the phonebook replace the old number with new one`)
        const id = foundUser.id
        personService
        .update(id, nameObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response));
        })
        setNewName('')
        setNumber('')
      
     
    }
    else 
    {
      personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNumber('')
      })
    
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNumber(event.target.value)
  }

  const filterUsers = (event) => {
    setSearchTerm(event.target.value)
    const filterdPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm));
    setPersons(filterdPersons)
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if(window.confirm(`delete ${personToDelete.name} ?`)){
      personService
      .deleteUser(id)
      .then(response => {
        const unfilteredusers = persons.filter(person => person.id !== id)
        setPersons(unfilteredusers)
      })
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={filterUsers}/>
      <h1>Add New</h1>

      <PersonForm
       newName={newName}
       number={number}
       handleSubmit={addContact}
       handleNameChange={handleNameChange}
       handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      
      
        {persons.map(person => (
          <Persons key={person.id} name={person.name} number={person.number} onDelete={() => handleDelete(person.id)}/>
        ))}
  
      
    </div>
  )
}

export default App