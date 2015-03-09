'use strict';

var express = require('express');
var mongoose = require('mongoose');
var pokemonRoutes = require('./routes/pokemon_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/pokemonapp_development');

var app = express();
app.use(express.static(__dirname + '/build'));
var router = express.Router();

pokemonRoutes(router);

app.use('/api/v1', router);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port '+ (process.env.PORT || 3000));
});
