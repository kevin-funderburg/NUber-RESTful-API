//rider.js

var mongoose = require('mongoose');

var riderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Rider name required"]
    },
    status: {
        type: String,
    },
    location: String,
    destination: String,
    driver: String,
});

mongoose.model('rider', riderSchema);

module.exports = mongoose.model('rider');
