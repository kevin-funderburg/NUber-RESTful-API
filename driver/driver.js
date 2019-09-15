//driver.js

var mongoose = require('mongoose');

// Geolocation struct
const GeoSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});
// END Geolocation struct

var driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Driver name required']
    },
    availability: {
        type: Boolean,
        default: true
    },
    rider: {
        type: Boolean,
        default: false
    },
    location: String,
    geometry: GeoSchema                         // Include GeoLocation as a parameter
                                                // of existing driver Schema
});
mongoose.model('driver', driverSchema);

module.exports = mongoose.model('driver');
