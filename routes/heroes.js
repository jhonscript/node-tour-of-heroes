const express = require('express');
const router = express.Router();

const heroService = require('../services/hero.service');

router.get('/heroes', (req, res) => {
    heroService.getHeroes(req, res);
});

router.get('/heroes/:_id', (req, res) => {
    heroService.getHero(req, res);
});

router.post('/heroes', (req, res) => {
    heroService.postHero(req, res);
});

router.put('/heroes', (req, res) => {
    heroService.putHero(req, res);
});

router.delete('/heroes/:_id', (req, res) => {
    heroService.deleteHero(req, res);
});

module.exports = router;