const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
morgan.token('response', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :response'))

let contacts = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Contact Server</h1>')
})

app.get('/info', (req, res) => {
    res.send(`<div><p>The phonebook contains ${contacts.length} contacts</p> <p>${new Date()}</p><div/>`)
})

app.get('/api/persons', (req, res) => {
    res.json(contacts)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find(contact => contact.id === id)
    contact ? res.json(contact) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    contacts = contacts.filter(contacts => contacts.id !== id)
    res.status(204).end()
})

const genId = () => Math.floor(Math.random() * 100000)

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({ error: 'The name of the contact is missing' })
    }
    else if (contacts.find(contacts => contacts.name === body.name)) {
        return res.status(400).json({ error: 'The name of the contact is already on the phonebook' })
    }

    if (!body.number) {
        return res.status(400).json({ error: 'The number of the contact is missing' })
    }

    const newContact = {
        name: body.name,
        number:  body.number,
        date: new Date(),
        id: genId()
    }

    contacts = contacts.concat(newContact)

    res.json(newContact)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})