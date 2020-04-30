const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Pokemon = require('./Pokemon');
router.use(bodyParser.json());

router.get('/', function (req, res) {
    Pokemon.getPokemons(function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', function (req, res) {
    Pokemon.getPokemon(req.params.id, function(err, rows) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
