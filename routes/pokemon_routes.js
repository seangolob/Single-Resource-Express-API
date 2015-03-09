'use strict';

var Pokemon = require('../models/Pokemon');
var bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());
  app.get('/pokemon', function(req, res){
    Pokemon.find({}, function(err, data){
      if(err) return res.status(500).send({'msg': 'could not get pokemon'});

        res.json(data);
    });
  });

  app.post('/pokemon', function(req, res){
    var newPokemon = new Pokemon(req.body);
    newPokemon.save(function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not save pokemon'});

      res.json(data);
    });
  });

  app.put('/pokemon/:id', function(req, res){
    var updatedPokemon = req.body;
    delete updatedPokemon._id;
    Pokemon.update({_id: req.params.id}, updatedPokemon, function(err){
      if (err) return res.status(500).send({'msg': 'could not put pokemon'});

      res.json(req.body);
    });
  });

  app.delete('/pokemon/:id', function(req, res){
    var deletedPokemon;
    Pokemon.find({_id: req.params.id}, function(err, data){
      if (err) return res.status(500).send({'msg': 'that pokemon does not exist!'});

      deletedPokemon = data;
    });
    Pokemon.remove({_id: req.params.id}, function(err, data){
      if (err) return res.status(500).send({'msg': 'that pokemon does not exist!'});

      res.json(deletedPokemon);
    });
  });
};
