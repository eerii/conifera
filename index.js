const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
morgan.token('response', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :response'))

const Contact = require('./models/contact')

app.get('/info', (req, res) => {
    Contact.count({}, function(err, count){
        res.send(`<div><p>The phonebook contains ${count} contacts</p> <p>${new Date()}</p><div/>`)
    });
})

app.get('/api/persons', (req, res) => {
    Contact.find({}).then(contact => {
        res.json(contact)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findById(req.params.id)
        .then(contact => {
            contact ? res.json(contact) : res.status(404).end()
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    /*if (!body.name) {
        return res.status(400).json({ error: 'The name of the contact is missing' })
    }

    if (!body.number) {
        return res.status(400).json({ error: 'The number of the contact is missing' })
    }*/

    const newContact = new Contact({
        name: body.name,
        number:  body.number,
        date: new Date()
    })

    newContact.save()
        .then(contact => {
            console.log(`${newContact.name} was saved to your phonebook`)
            res.json(contact)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const newContact ={
        name: body.name,
        number:  body.number,
        date: new Date()
    }

    Contact.findByIdAndUpdate(req.params.id, newContact, { new: true })
        .then(updatedContact => {
            res.json(updatedContact)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'The ID is not formatted propperly' })
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    else {
        console.log(error)
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

//Deprecated code

/*let contacts = [
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
]*/

/*app.get('/', (req, res) => {
    res.send('<h1>Contact Server</h1>')
})*/