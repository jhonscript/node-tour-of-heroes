"use strict";

const os = require('os');

let master = function (config) {
	config = config || { cluster: 'ERROR CONFIG'};
	let Cluster = config.cluster;
	
	let createWorker = () => {
		Cluster.fork();
	};

	let ready = () => {
		
		Cluster.on('listening', (worker, address) => {
			console.log(`Worker #${worker.id} with the process id ${worker.process.pid} is now connected to ${address.address}:${address.port}`);
		});

		Cluster.on('exit', (worker) => {
			console.log(`worker #${worker.id} with the process id ${worker.process.pid} died`);
					
			setTimeout(function(){
				createWorker();
			}, 500);
		});
	};
	
	return {
		run: function() {
			let cpuCount = os.cpus().length;
			console.log(`Master cluster with the process id: ${process.pid}, is setting up ${cpuCount} workers`);
			
			for (var i = 0; i < cpuCount; i += 1){
				createWorker();        
			}
			
			ready();
		}
	}
};

module.exports = master;