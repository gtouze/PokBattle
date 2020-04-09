var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Dresseur = require('./Dresseur');

router.get('/', function (req, res) {
    Dresseur.getDresseurs(function(err,rows){
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', function (req, res) {
    Dresseur.createDresseur(req.body,function(err,count){
        if(err) {
            res.status(400).json(err);
        } else {
            res.json(req.body);
        }
    });
});

module.exports = router;
