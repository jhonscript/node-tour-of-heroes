"use strict";

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let mongo = function (mongoUri, idWorker) {
	
	let MongoUri = mongoUri;
	let IdWorker = idWorker;
	
	let responseDatabase = (err, res) => {
		if (err) {
		  console.log('ERROR: connecting to Database #' + IdWorker + '. ' + err);
		} else {
		  console.log('worker #' + IdWorker + ' is now connected to Database');
		}
	}
	
	return {
		connect: function () {
			mongoose.connect(MongoUri, responseDatabase);
		}
	}
};

module.exports = mongo;