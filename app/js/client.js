'use strict';

require('angular/angular');

var pokemonApp = angular.module('pokemonApp', []);

require('./pokemon/controllers/pokemon_controller.js')(pokemonApp);
