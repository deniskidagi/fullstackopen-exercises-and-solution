import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Persons'
import Notifications from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

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
          const successJob = `${nameObject.name} phone number updated successfully`
          setSuccessMessage(successJob)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2000)
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
        const successJob = `${nameObject.name} added successfully`
        setSuccessMessage(successJob)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2000)
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
        const successJob = `${personToDelete.name} deleted successfully`
        setSuccessMessage(successJob)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2000)
        const unfilteredusers = persons.filter(person => person.id !== id)
        setPersons(unfilteredusers)
      })
      .catch(err => {
        const failedJob = `${personToDelete.name} does not exist`
        setSuccessMessage(failedJob)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2000)
        const unfilteredusers = persons.filter(person => person.id !== id)
        setPersons(unfilteredusers)
      })
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={successMessage}/>
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