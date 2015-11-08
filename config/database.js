var config = require('./index');
var mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db.url, function (err, res) {
      if (err) {
        console.log ('ERROR connecting to: ' + config.db.name + '. ' + err);
      } else {
        console.log ('Succeeded connected to: ' + config.db.name);
      }
    });
    
    return db;
};

/*
var config = require('./index');
var mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db.url);
    return db;
};
*/

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + config.db.name);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});