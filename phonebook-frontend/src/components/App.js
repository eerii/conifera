import React, { useState, useEffect } from 'react'
import Form from './Form'
import Search from './Search'
import Book from './Book'
import contactService from '../services/contacts'

const Notification = ({ error, message }) => {
    const notificationStyle = {
        color: 'white',
        background: 'green',
        fontSize: 16,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {...notificationStyle, background: 'red'}

    if (!message) {
        return null
    }

    return (
        <div style={error ? errorStyle : notificationStyle}>
            {message}
        </div>
    )
}

const App = () => {
    const [ contacts, setContacts ] = useState([])
    const [ searchVal, setSearchVal ] = useState('')
    const [ notification, setNotification ] = useState([false, ''])
    const [ timeout, setTheTimeout ] = useState(null)

    useEffect(() => {
        //console.log("Effect")
        contactService.getContact().then(contactlist => {
                //console.log("Promise fulfilled")
                setContacts(contactlist)
            })
    }, [])
    //console.log("Render", contacts.length, "contacts")

    return (
        <div>
            <h1>Phonebook</h1>

            <Notification error={notification[0]} message={notification[1]}/>

            <h3>Add New</h3>
            <Form contacts={contacts} setContacts={setContacts} setNotification={setNotification} timeout={timeout} setTheTimeout={setTheTimeout}/>

            <h3>Contacts</h3>
            <Search searchVal={searchVal} setSearchVal={setSearchVal}/>
            <Book contacts={contacts} setContacts={setContacts} search={searchVal} setNotification={setNotification} timeout={timeout} setTheTimeout={setTheTimeout}/>
        </div>
    )
}

export default App