const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

let uniqueValidator = require('mongoose-unique-validator')

require('dotenv').config()

console.log(`Attempting connection to ${process.env.MONGODB_URI}...`)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connection successful') })
    .catch((error) => {
        console.log('There was an error connecting to MongoDB:', error.message) })

const contactSchema = new mongoose.Schema({
    name: {type:String, required:true, unique:true},
    number: {type:String, required:true},
    date: {type:Date, required:true}
})
contactSchema.plugin(uniqueValidator)

const Contact = mongoose.model('Contact', contactSchema)

contactSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)