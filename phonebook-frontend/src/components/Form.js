import React, {useState} from 'react'
import contactService from '../services/contacts'

const Form = ({contacts, setContacts, setNotification, timeout, setTheTimeout}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const addContact = (event) => {
        event.preventDefault()
        if ((contacts.map(contacts => contacts.name.toLowerCase())).includes(newName.toLowerCase())) {
            const key = Object.keys(contacts).find(key => contacts[key].name.toLowerCase() === newName.toLowerCase());
            if (contacts[key].number !== newNumber) {
                if (window.confirm(`${newName} is already in your phonebook. Do you want to change the old number ${contacts[key].number} for this new number ${newNumber}?`)) {
                    const changedContact = { ...contacts[key], number: newNumber }
                    contactService.changeNumber(changedContact.id, changedContact)
                        .then(newContact => {
                            setContacts(contacts.map(contacts => contacts.id !== changedContact.id ? contacts : newContact))
                            setNotification([false, `The entry for ${newName} was updated`])
                            if (timeout) {clearTimeout(timeout)}
                        })
                        .catch(error => {
                            if (error.name === 'TypeError') {
                                setNotification([true, `The entry for ${newName} has been removed from the server`])
                                setContacts(contacts.filter(n => n.id !== changedContact.id))
                            }
                            else {
                                setNotification([true, error.message])
                            }
                            if (timeout) {clearTimeout(timeout)}
                        })
                }
            }
            else {
                setNotification([true, `Your phonebook already includes ${newName}`])
                if (timeout) {clearTimeout(timeout)}
            }
        }
        else {
            const contactObj = {
                name: newName,
                number: newNumber
            }

            contactService.newContact(contactObj)
                .then(contact => {
                    setContacts(contacts.concat(contact))
                    setNotification([false, `${newName} has been added to your phonebook!`])
                    if (timeout) {clearTimeout(timeout)}
                })
                .catch(error => {
                    setNotification([true, error.message])
                    if (timeout) {clearTimeout(timeout)}
                })
        }

        setNewName('')
        setNewNumber('')

        setTheTimeout(setTimeout(() => {
            setNotification([false, ''])
        }, 3000))
    }

    const onNameChange = (event) => {
        setNewName(event.target.value)
    }

    const onNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={event => addContact(event)}>
            <div>
                Name: <input value={newName} onChange={onNameChange}/>
            </div>
            <div>
                Phone Number: <input value={newNumber} onChange={onNumberChange}/>
            </div>
            <div>
                <button type="submit">Add Contact</button>
            </div>
        </form>
    )
}

export default Form