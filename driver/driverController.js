//driverController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var driver = require('./driver');
var rider = require('../rider/rider')


//returns all drivers in the database
router.get('/', function (req, res) {

    driver.find({}, function (err, driver) {
        if (err) return res.status(500).send("There was a problem finding the riders.");
        res.status(200).send(driver);
    });
});

//returns specific driver
router.get('/:id', function (req, res) {

    driver.findById(req.params.id, function (err, driver) {
        if (err) return res.status(500).send("There was a problem finding the rider.");
        if (!rider) return res.status(404).send("No rider found.");
        res.status(200).send(driver);
    });
});

//updates driver
router.put('/:id', function (req, res) {
    driver.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, driver){
        if (err) return res.status(500).send("There was a problem updating the driver.");
        res.status(200).send(driver);
    });
});

////////////

//returns specific rider by name
router.get('/rider/:name', function (req, res) {

    rider.findOne(req.params.id, function (err, rider) {
        if (err) return res.status(500).send("There was a problem finding the rider testing.");
        if (!rider) return res.status(404).send("No rider found.");
        res.status(200).send(rider);
    });
});


//returns assigned rider's location
router.get('/riderlocation/:id', function (req, res) {
    driver.findById(req.params.id, function (err, driver){
        if (err) return res.status(500).send("Error 5");
        if (!driver) return res.status(404).send("No driver found");

        rider.findById(driver.rider, function (err, rider) {
            if (err) return res.status(500).send("There was a problem finding the rider testing.");
            if (!rider) return res.status(404).send("No rider found.");
            res.status(200).send(rider.location);
        });
    });
});

//returns assigned rider's destination
router.get('/riderdestination/:id', function (req, res) {
    driver.findById(req.params.id, function (err, driver){
        if (err) return res.status(500).send("Error 6");
        if (!driver) return res.status(404).send("No driver found");

        rider.findById(driver.rider, function (err, rider) {
            if (err) return res.status(500).send("There was a problem finding the rider testing.");
            if (!rider) return res.status(404).send("No rider found.");
            res.status(200).send(rider.destination);
        });
    });
});

module.exports = router;
