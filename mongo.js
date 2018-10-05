const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const mongoUri = "mongodb://admin:google123@heroes-shard-00-00-fiphf.mongodb.net:27017,heroes-shard-00-01-fiphf.mongodb.net:27017,heroes-shard-00-02-fiphf.mongodb.net:27017/tour?ssl=true&replicaSet=Heroes-shard-0&authSource=admin";

function connect() {
  return mongoose.connect(mongoUri, function(err, res) {
    if(err) {
          console.log('ERROR: connecting to Database #' + this.id + '. ' + err);
      } else {
          console.log('worker #' + this.id + ' is now connected to Database');
      }
  });
}

module.exports = {
  connect
}