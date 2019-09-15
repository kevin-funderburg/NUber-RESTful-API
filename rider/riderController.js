//riderController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var rider = require('./rider');
var driver = require('../driver/driver');
var trip = require('../trip/trip');


//returns all riders in the database
router.get('/', function (req, res) {

    rider.find({}, function (err, rider) {
        if (err) return res.status(500).send("There was a problem finding the riders.");
        res.status(200).send(rider);
    });
});


//returns specific rider
router.get('/:id', function (req, res) {

    rider.findById(req.params.id, function (err, rider) {
        if (err) return res.status(500).send("There was a problem finding the rider.");
        if (!rider) return res.status(404).send("No rider found.");
        res.status(200).send(rider);
    });
});


//returns all drivers within 10 miles of rider
router.get('/driverByDistance/:id', function (req, res)
{
    const TENMILES = 16094;

    var closeDrivers = [];
    var urlbase = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial';
    var mapsAPIkey = 'AAAAAAAABBBBBBBCCCCCCCDDDDDDEEEEEE';  // actual key removed for security

    rider.findById(req.params.id, function (err, rider) {
        if (err) return res.status(500).send("There was a problem finding the rider.");
        if (!rider) return res.status(404).send("No rider found.");

        driver.find({}, function (err, drivers) {

            var origins = rider.location;
            var destinations = "";

            // Encode the locations for the URL to be passed
            drivers.forEach(function (driver) {
                var encodedLoc = driver.location.replace(",", "%2C");

                if (destinations === "")
                    destinations = encodedLoc;
                else
                    destinations = destinations + "%7C" + encodedLoc;
            });

            var distanceMatrixURL = urlbase + "&origins=" + origins + "&destinations=" + destinations + "&key=" + mapsAPIkey;

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", distanceMatrixURL, true);
            xmlhttp.send();

            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    var myObj = JSON.parse(this.responseText);

                    for (let i = 0; i < myObj.rows[0].elements.length; i++) {
                        var dist = myObj.rows[0].elements[i].distance.value;
                        if (dist <= TENMILES) {
                            console.log("FOUND ONE");
                            console.log(drivers[i].name);
                            closeDrivers.push({
                                name: drivers[i].name,
                                availability: drivers[i].availability,
                                location: drivers[i].location
                            });
                        }
                    }
                    if (err) return res.status(500).send("There was a problem drivers within 10 miles.");
                    if (closeDrivers.length == 0) return res.status(200).send("No drivers are within 10 miles");
                    return res.status(200).send(closeDrivers);
                }
            };
        });

    });
});

//updates rider
router.put('/:id', function (req, res) {
    rider.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, rider){
        if (err) return res.status(500).send("There was a problem updating the rider.");
        res.status(200).send(rider);
    });
});


///returns assigned driver's location
router.get('/driverlocation/:id', function (req, res) {
    rider.findById(req.params.id, function (err, rider){
        if (err) return res.status(500).send("Error 5");
        if (!rider) return res.status(404).send("No rider found");

        driver.findById(rider.driver, function (err, driver) {
            if (err) return res.status(500).send("There was a problem finding the driver.");
            if (!driver) return res.status(404).send("No driver found.");
            res.status(200).send(driver.location);
        });
    });
});


//rider sets their assigned driver
router.put('/setdriver/:id', function (req, res) {

    if (req.body.driver){
        rider.findByIdAndUpdate(req.params.id, {driver : req.body.driver}, {new: true}, function (err, rider){
            if (err) return res.status(500).send("There was a problem updating the rider.");
            res.status(200).send(rider);
        });
    }
    else return res.status(500).send("Did not specify a driver");

});


///TODO - These need work, need to discuss with prof best method to incorporate trips

//get all trips for a rider
router.get('/allRiderTrips/:id', function (req, res) {

    rider.findById(req.params.id, function (err, rider) {
        if (err) return res.status(500).send("There was a problem finding the rider.");
        if (!driver) return res.status(404).send("No rider found.");

        trip.find({}, function (err, trip) {
            if (err) return res.status(500).send("There was a problem finding the trips.");
            if (!trip) return res.status(404).send("No trip found.");
            res.status(200).send(trip);
        });
    });    res.status(200).send(rider);

});


//make a trip for a rider
router.put('/makeTrip/:id', function (req, res) {

    rider.findById(req.params.id, function (err, rider) {
        if (err) return res.status(500).send("There was a problem finding the rider.");
        if (!rider) return res.status(404).send("No rider found.");

        trip.create({
                status : req.body.status,
                location : req.body.location,
                driver_id: rider.driver,
                rider_id: rider.id,
                specialNotes : req.body.specialNotes,
                tipAmount : req.body.tipAmount,
                rating : req.body.rating,
                zenMode : req.body.zenMode
            },
            function (err, trip) {
                if (err) return res.status(500).send("There was a problem adding the trip information to the database.");
                res.status(200).send(trip);
            });
    });

});

module.exports = router;
