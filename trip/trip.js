//trip.js

var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
    status: String,
    location: String,
    driver_id: String,
    rider_id: String,
    specialNotes: {
        type: String,
        default: "none"
    },
    tipAmount: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    zenMode: {
        type: Boolean,
        default: false
    }
});

mongoose.model('trip', tripSchema);

module.exports = mongoose.model('trip');
