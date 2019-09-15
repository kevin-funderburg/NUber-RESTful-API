//adminController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var admin = require('./admin');
var driver = require('../driver/driver');
var rider = require('../rider/rider');
var trip = require('../trip/trip')

//create a new admin
router.post('/admin', function (req, res) {

    admin.create({
        name : req.body.name
    },
    function (err, admin) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(admin);
    });
})

//create a new driver
router.post('/driver', function (req, res) {

    driver.create({
        name : req.body.name,
        location : req.body.location,
        availability : req.body.availability,
        driver : req.body.driver
    },
    function (err, driver) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(driver);
    });
})

//create a new rider
router.post('/rider', function (req, res) {

    rider.create({
        name : req.body.name,
        status : req.body.status,
        location : req.body.location,
        destination : req.body.destination,
        rider: req.body.rider
    },
    function (err, rider) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(rider);
    });
})


//returns all admins in the database
router.get('/', function (req, res) {

    admin.find({}, function (err, admin) {
        if (err) return res.status(500).send("There was a problem finding the admins.");
        res.status(200).send(admin);
    });
});

//returns specific admin
router.get('/:id', function (req, res) {

    admin.findById(req.params.id, function (err, admin) {
        if (err) return res.status(500).send("There was a problem finding the admins.");
        if (!admin) return res.status(404).send("No admin found.");
        res.status(200).send(admin);
    });
});

//delete admin
router.delete('/:id', function (req, res){

    admin.findByIdAndRemove(req.params.id, function (err, admin){
        if (err) return res.status(500).send("There was a problem deleting the admin.");
        res.status(200).send("admin " + admin.name + " was deleted.");
    });
});

//delete rider
router.delete('/rider/:id', function (req, res){

    rider.findByIdAndRemove(req.params.id, function (err, rider){
        if (err) return res.status(500).send("There was a problem deleting the rider.");
        res.status(200).send("rider " + rider.name + " was deleted.");
    });
});

//delete driver
router.delete('/driver/:id', function (req, res){

    driver.findByIdAndRemove(req.params.id, function (err, driver){
        if (err) return res.status(500).send("There was a problem deleting the driver.");
        res.status(200).send("driver " + driver.name + " was deleted.");
    });
});


module.exports = router;
