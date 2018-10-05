'use strict'

const express     = require("express"),  
      path        = require('path'),  
      mongoose    = require('mongoose'),
      bodyParser  = require("body-parser");

const conf        = require('./env/conf'),    
      routes      = require('./routes/heroes');

const port        = process.env.PORT || conf.serverPort,
      env         = process.env.NODE_ENV || conf.serverEnv,
      root        = './';

// config worker
var Workers = function(idWorker){

    idWorker = idWorker || 0
    // create server application
    this.server     = express()
        .use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
            res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
            console.log('# ' + idWorker);
            next();
        })    
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: false}))
        .use(express.static(path.join(root, 'dist')))
        .use('/api', routes);

    this.id         = idWorker;
};

// run worker
Workers.prototype.run = function(msg){
    this.server.listen(port, function(){
        msg = msg || '';
        if(msg != '') console.log(msg);
    });
};

// Been able to run slave as stand alone;
if(module.parent){
    module.exports = Workers;
}else{
    var worker = new Workers();
    worker.run('worker #0 is now connected to localhost:' + port);
}