import React from "react";
import contactService from '../services/contacts'

const Button = ({name, id, contacts, setContacts, contactName, setNotification, timeout, setTheTimeout}) => {

    const deleteThis = (event) => {
        if (window.confirm(`Do you really want to delete ${contactName}?`)) {
            contactService.deleteContact(id)
                .then(() => {
                    setNotification([true, `The entry for ${contactName} has been removed from the server`])
                    if (timeout) {clearTimeout(timeout)}
                    setContacts(contacts.filter(c => c.id !== id))
                })
                .catch(error => {
                    setNotification([true, `The entry for ${contactName} has already been removed from the server`])
                    if (timeout) {clearTimeout(timeout)}
                    setContacts(contacts.filter(n => n.id !== id))
                })
        }
        setTheTimeout(setTimeout(() => {
            setNotification([false, ''])
        }, 3000))
    }

    return (
        <button onClick={event => deleteThis(event)}>{name}</button>
    )
}

const Display = ({name, number}) => {
    return (
        <p>{name}: {number}</p>
    )
}

const Book = ({contacts, setContacts, search, setNotification, timeout, setTheTimeout}) => {
    const searchContacts = contacts.filter(contacts => contacts.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            {searchContacts.map(searchContacts =>
                <div key={searchContacts.id}>
                    <Display name={searchContacts.name} number={searchContacts.number}/>
                    <Button name="Delete" id={searchContacts.id} contacts={contacts} setContacts={setContacts} contactName={searchContacts.name} setNotification={setNotification} timeout={timeout} setTheTimeout={setTheTimeout}/>
                </div>)}
        </div>
    )
}

export default Book