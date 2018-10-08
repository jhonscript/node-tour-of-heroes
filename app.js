"use strict";
const cluster = require('cluster');

if (cluster.isMaster) {
    const master = require('./master');
	let configMaster = { cluster: cluster };
    let masterInstance = master(configMaster);    
	
	masterInstance.run();
} else {
    const worker = require('./worker');
	let configWorker = { worker: cluster.worker };
    let workerInstance = worker(configWorker);
	
    workerInstance.run();
}