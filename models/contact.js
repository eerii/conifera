const mongoose = require('mongoose')

require('dotenv').config()

console.log(`Attempting connection to ${process.env.MONGODB_URI}...`)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connection successful') })
    .catch((error) => {
        console.log('There was an error connecting to MongoDB:', error.message) })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})

const Contact = mongoose.model('Contact', contactSchema)

contactSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)