const { strict } = require('assert')
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const ticketSchema = new mongoose.Schema(
    {
        ticketID:{
            type: String,
            required: false
        },
        user: {
            type: String,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        hash: {
            type:String,
            required: true
        }
    },
)


module.exports = mongoose.model('Ticket', ticketSchema)