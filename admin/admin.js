//User.js

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String
});
mongoose.model('admin', userSchema);

module.exports = mongoose.model('admin');