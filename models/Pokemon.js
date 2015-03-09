'use strict';

var mongoose = require('mongoose');

var pokemonSchema = new mongoose.Schema({
  pokemonName: String,
  pokemonType: {type: String, default: 'Normal'}
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
