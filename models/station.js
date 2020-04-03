const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
    Connections: [{type: Schema.Types.ObjectId, ref: 'Connection'}],
    Title: String,
    AddressLine1: String,
    Town: String,
    StateOrProvince: String,
    Postcode: String,
    Location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
});

module.exports = mongoose.model('Station', stationSchema);

