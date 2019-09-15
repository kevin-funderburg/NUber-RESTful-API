//tripController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var rider = require('../rider/rider');
var driver = require('../driver/driver');
var trip = require('./trip');

//create a new trip
router.post('/', function (req, res) {

    trip.create({
            status : req.body.status,
            location : req.body.location,
            driver: req.body.driver,
            rider: req.body.rider,
            specialNotes : req.body.specialNotes,
            tipAmount : req.body.tipAmount,
            rating : req.body.rating,
            zenMode : req.body.zenMode
        },
        function (err, trip) {
            if (err) return res.status(500).send("There was a problem adding the trip information to the database.");
            res.status(200).send(trip);
        });
})


//returns all trips in the database
router.get('/', function (req, res) {

    trip.find({}, function (err, trip) {
        if (err) return res.status(500).send("There was a problem finding the trips.");
        res.status(200).send(trip);
    });
});


// deletes trips
router.delete('/:id', function (req, res){

    trip.findByIdAndRemove(req.params.id, function (err, trip){
        if (err) return res.status(500).send("There was a problem deleting the trip.");
        res.status(200).send("trip " + trip.id + " was deleted.");
    });
});

//updates trip
router.put('/:id', function (req, res) {
    trip.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, trip){
        if (err) return res.status(500).send("There was a problem updating the trip.");
        res.status(200).send(trip);
    });
});

module.exports = router;