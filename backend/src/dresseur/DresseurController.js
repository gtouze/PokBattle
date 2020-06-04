const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Dresseur = require('./Dresseur');
router.use(bodyParser.json());

router.get('/', function (req, res) {
    Dresseur.getDresseurs(function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', function (req, res) {
    Dresseur.getDresseur(req.params.id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/byusername/:username', function (req, res) {
    Dresseur.getDresseurbyUsername(req.params.username, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', function (req, res) {
    Dresseur.createDresseur(req.body, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.put('/:id', function (req, res) {
    Dresseur.updateDresseur([req.body, req.params.id], function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.delete('/:id', function (req, res) {
    Dresseur.deleteDresseur(req.params.id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
