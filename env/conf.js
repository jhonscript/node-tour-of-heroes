"use strict";

let config = function (idWorker) {
 
	let IdWorker = idWorker
		, serverPort = process.env.PORT || 8000
		, serverEnv = process.env.NODE_ENV || "production"
		, serverMongoUri = "mongodb://admin:google123@heroes-shard-00-00-fiphf.mongodb.net:27017,heroes-shard-00-01-fiphf.mongodb.net:27017,heroes-shard-00-02-fiphf.mongodb.net:27017/tour?ssl=true&replicaSet=Heroes-shard-0&authSource=admin";
 
	return {
		
		getServerPort: () => {
			return serverPort;
		}
		, getServerEnv: () => {
			return serverEnv;
		}
		, getServerMongoUri: () => {
			return serverMongoUri;
		}
		, serverHeader: (req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
			res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
			console.log(`#${IdWorker}`);
			next();
		}
		
	};
};
		
module.exports = config;