import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (newNumber === '' || newName === '') {
      alert('Please enter a name and number')
      return
    }

    if (persons.filter(person => person.number === newNumber).length > 0) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    if (persons.filter(person => person.name === newName).length > 0) {
      const personOfQuery = persons.find(person => person.name === newName)
      if (window.confirm(`${newName} is already in the phonebook, would you like to update his number?`)) {
        const updatedPerson = {...personOfQuery, number: newNumber}
        personsService
          .update(personOfQuery.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personOfQuery.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotifMessage(`The number of ${personOfQuery.name} has been updated`)
            setTimeout(() => {setNotifMessage(null)}, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${personOfQuery.name} has already been removed from server`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
      }
      return
    }
    
    personsService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotifMessage(`Added ${nameObject.name}`)
        setTimeout(() => {setNotifMessage(null)}, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
  }

  const showOnly = (event) => {
    setSearchName(event.target.value)
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notifMessage} error={false}/>
      <Notification message={errorMessage} error={true}/>

      <Filter filter={showOnly}/>

      <h2>add a new</h2>

      <PersonForm name={newName} nameChange={handleNameChange} 
      number={newNumber} numberChange={handleNumberChange} add={addPerson}/>
      
      <h2>Numbers</h2>

      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App