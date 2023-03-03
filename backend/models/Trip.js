const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const tripSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
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
        price: {
            type: Number,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

tripSchema.plugin(AutoIncrement, {
    inc_field: 'ticketID',
    id: 'ticketNums',
    start_seq: 800
})

module.exports = mongoose.model('Trip', tripSchema)