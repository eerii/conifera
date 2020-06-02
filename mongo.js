const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://josekoalas:${password}@fullstackopen-2gcif.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const contactSchema = new mongoose.Schema({
    name: String,
    number: Number,
    date: Date
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length == 3) {
    Contact.find({}).then(result => {
        console.log("Phonebook\n---")
        result.forEach(contact => {
            console.log(`Name: ${contact.name} | Number: ${contact.number}`)
        })
        mongoose.connection.close()
    })
}
else if (process.argv.length == 5) {
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4],
        date: new Date()
    })

    contact.save().then(result => {
        console.log(`${contact.name} was saved to your phonebook`)
        mongoose.connection.close()
    })
}
else {
    console.log("You need to specify only two terms, the contact name and the contact number. If the name contains whitespaces, enclose it in quotes. If you want to check your phonebook, don't add more terms.")
    process.exit(1)
}

