'use strict'

module.exports = function(app) {
  app.controller('pokemonController', ['$scope', '$http', function($scope, $http) {
    $scope.pokemons = [];
    $scope.getAllPokemon = function() {
      $http({
        method: 'GET',
        url: '/api/v1/pokemon'
      })
      .success(function(data) {
        $scope.pokemons = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.addPokemon = function(pokemon) {
      $http({
        method: 'POST',
        url: '/api/v1/pokemon',
        data: pokemon
      })
      .success(function(data) {
        $scope.pokemons.push(data);
        $scope.newPokemon.pokemonName = "";
        $scope.newPokemon.pokemonType = "";
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.deletePokemon = function(pokemon) {
      $http({
        method: 'DELETE',
        url: '/api/v1/pokemon/' + pokemon._id
      })
      .success(function() {
        $scope.pokemons.splice($scope.pokemons.indexOf(pokemon), 1);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.editPokemon = function(pokemon) {
      $http({
        method: 'PUT',
        url: '/api/v1/pokemon/' + pokemon._id,
        data: pokemon
      })
      .success(function() {
        pokemon.editing = false;
        pokemon.pokemonName = pokemon.pokemonNameTemp;
        pokemon.pokemonType = pokemon.pokemonTypeTemp;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.editToggle = function(pokemon) {
      if (pokemon.editing) {
        pokemon.pokemonName = pokemon.oldPokemonName;
        pokemon.pokemonType = pokemon.oldPokemonType;
        pokemon.editing = false;
      } else {
        pokemon.oldPokemonName = pokemon.pokemonName;
        pokemon.oldPokemonType = pokemon.pokemonType;
        pokemon.pokemonNameTemp = pokemon.pokemonName;
        pokemon.pokemonTypeTemp = pokemon.pokemonType;
        pokemon.editing = true;
      }
    };
  }]);
}
