"use strict";
 
const express = require("express")  
		, path = require('path')  
		, bodyParser = require("body-parser");

const conf = require('./env/conf')  
		, mongo = require('./mongo')
		, routes = require('./routes/heroes');
		
let worker = function (config){
	
	config = config || { worker: { id: 0 } };

    let IdWorker = config.worker.id;
	let ConfInstance = conf(IdWorker);
	let Server;
	let Mongoinstance;	
	
	let createServer = () => { 
		Server = express();
		let middleware = { header: ConfInstance.serverHeader };
		let properties = { 
			port: ConfInstance.getServerPort()
			, connectionDatabase: ConfInstance.getServerMongoUri()
		};
		let options = { middleware: middleware, properties: properties };
		
		configServer(options);
	};

	let configServer = (options) => {
		let middleware = options.middleware;
		let properties = options.properties;
		
		Server
			.use(middleware.header)    
			.use(bodyParser.json())
			.use(bodyParser.urlencoded({ extended: false }))
			.use(express.static(path.join('./', 'dist')))
			.use('/api', routes);
			
		Server.set('port', properties.port);
		Server.set('connectionDatabase', properties.connectionDatabase);
	};
	
	createServer();
	
	return {
		run: () => {
			let port = Server.get('port');
			let connectionDatabase = Server.get('connectionDatabase');
			
			Server.listen(port, function(msg){
				msg = msg || false;
				if(msg != false) {
					console.log(`worker #${IdWorker} is now connected to localhost:${port}`);
				}
			});
			
			Mongoinstance = mongo(connectionDatabase, IdWorker);
			Mongoinstance.connect();
		}
	};
};

if (module.parent) {
    module.exports = worker;
} else {
    var workerInstance = worker();
	workerInstance.run(true);
}