const Hero = require('../models/hero.model');

require('../mongo').connect();

function getHeroes(req, res) {
    const docquery = Hero.find({});
    docquery
        .exec()
        .then(heroes => {
            res.status(200).json(heroes);
            console.log('Heroes get successfully!');
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        });
}

function getHero(req, res) {
    const _id = req.params._id;
    const docquery = Hero.findOne({ _id: _id});
    
    docquery
        .exec()
        .then(hero => {
            if(!checkFound(res, hero)) return;
            res.status(200).json(hero);
            console.log('Hero get successfully!');
        })
        .catch(error => {
            if(checkServerError(res, error)) return;
        });
}

function postHero(req, res) {
    orginalHero = { name: req.body.name };
    const hero = new Hero(orginalHero);
    hero.save(error => {
        if(checkServerError(res, error)) return;
        res.status(201).json(hero);
        console.log('Hero created successfully');
    });
}

function putHero(req, res) {
    const _id = req.body._id;
    const updatedHero = { name: req.body.name };

    Hero.findOne({ _id: _id }, (error) => {
        if(checkServerError(res, error)) return;        
    }).then(hero => {
        if(!checkFound(res, hero)) return;

        hero.name = updatedHero.name;
        hero.save(error => {
            if(checkServerError(res, error)) return;
            res.status(200).json(hero);
            console.log('Hero update successfully!');
        });
    })
}

function deleteHero(req, res) {
    const _id = 
    Hero.findOneAndRemove({ _id: _id})
        .then(hero => {
            if(!checkFound(res, hero)) return;
            res.status(200).json(hero);
            console.log('Hero delete successfully!');
        })
        .catch(error => {
            if(checkServerError(res, error)) return;
        });
}

function checkFound(res, hero) {
    if(!hero) {
        res.status(404).send('Hero not found.');
        return;
    }
    return hero;
}

function checkServerError(res, error) {
    if(error)
    {
        res.status(500).send(error);
        return error;
    }
}

module.exports = {
    getHeroes,
    getHero,
    postHero,
    putHero,
    deleteHero
}