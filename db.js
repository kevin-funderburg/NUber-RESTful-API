
// db.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://TeamStarstream:%23nosecurity%23yolo@starscream-shard-00-00-xti5s.mongodb.net:27017,starscream-shard-00-01-xti5s.mongodb.net:27017,starscream-shard-00-02-xti5s.mongodb.net:27017/test?ssl=true&replicaSet=Starscream-shard-0&authSource=admin&retryWrites=true').then(()=>{console.log('success!')}).catch(
  (error) => {console.log(error);}
);