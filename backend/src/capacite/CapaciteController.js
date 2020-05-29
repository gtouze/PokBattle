const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Capacite = require('./Capacite');
router.use(bodyParser.json());

router.get('/', function (req, res) {
    Capacite.getCapacites(function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', function (req, res) {
    Capacite.getCapacite(req.params.id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', function (req, res) {
    if((req.body.puissance + req.body.precisionCapacite) <= 150 ) {
        if(["Plante", "Eau", "Feu", "Normal"].includes(req.body.type)) {
            Capacite.createCapacite(req.body, function(err, rows) {
                if(err) {
                    res.status(400).json(err);
                } else {
                    res.json(rows);
                }
            });
        } else {
            res.status(400).json("Seul les capacitées de type Plante, Eau, Feu ou Normal sont actuellement supportées, valeur actuelle: " + req.body.type);
        }
    } else {
        res.status(400).json("Le total de puissance + précision doit être inférieur ou égal à 150");
    }
});

router.put('/:id', function (req, res) {
    if((req.body.puissance + req.body.precisionCapacite) <= 150 ) {
        if(["Plante", "Eau", "Feu", "Normal"].includes(req.body.type)) {
            Capacite.updateCapacite([req.body, req.params.id], function(err, rows) {
                if(err) {
                    res.status(400).json(err);
                } else {
                    res.json(rows);
                }
            });
        } else {
            res.status(400).json("Seul les capacitées de type Plante, Eau, Feu ou Normal sont actuellement supportées");
        }
    } else {
        res.status(400).json("Le total de puissance + précision doit être inférieur ou égal à 150");
    }
});

router.delete('/:id', function (req, res) {
    Capacite.deleteCapacite(req.params.id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
