//app.js

var express = require('express');
var app = express();

var db = require('./db');

var adminController = require('./admin/adminController');
app.use('/admin', adminController);

var driverController = require('./driver/driverController');
app.use('/driver', driverController);

var riderController = require('./rider/riderController');
app.use('/rider', riderController);

var tripController = require('./trip/tripController');
app.use('/trip', tripController);

module.exports = app;