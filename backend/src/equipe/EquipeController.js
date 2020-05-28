const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Equipe = require('./Equipe');
router.use(bodyParser.json());

router.get('/', function (req, res) {
    Equipe.getEquipes(function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', function (req, res) {
    Equipe.getEquipesDresseur(req.params.id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', function (req, res) {
    Equipe.createEquipe(req.body, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.put('/:id', function (req, res) {
    Equipe.updateEquipe([req.body, req.params.id], function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.delete('/:id', function (req, res) {
    Equipe.deleteEquipe(req.params.id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
