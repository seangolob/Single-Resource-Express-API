'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('pokemon controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('pokemonApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var pokemonController = $ControllerConstructor('pokemonController', {$scope: $scope});
    expect(typeof pokemonController).toBe('object');
    expect(Array.isArray($scope.pokemons)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have an index function', function() {
      $httpBackend.expectGET('/api/v1/pokemon').respond(200, [{pokemonName: 'test name', pokemonType: 'test type'}]);

      var pokemonController = $ControllerConstructor('pokemonController', {$scope: $scope});
      $scope.getAllPokemon();
      $httpBackend.flush();

      expect($scope.pokemons[0].pokemonName).toBe('test name');
      expect($scope.pokemons[0].pokemonType).toBe('test type');
    });

    it('should be able to create a pokemon', function() {
      $httpBackend.expectPOST('/api/v1/pokemon').respond(200, {_id: 1, pokemonName: 'test name', pokemonType: 'test type'});
      $scope.pokemons = [];
      $scope.newPokemon = {};
      $ControllerConstructor('pokemonController', {$scope: $scope});
      $scope.addPokemon({pokemonName:'test name', pokemonType: 'test type'});
      $httpBackend.flush();

      expect($scope.pokemons[0]._id).toBe(1);
    });

    it('should be able to update a pokemon', function() {
      $httpBackend.expectPUT('/api/v1/pokemon/1').respond(200);

      var pokemonController = $ControllerConstructor('pokemonController', {$scope: $scope});
      var pokemon = {pokemonName: 'test name', pokemonType: 'test type', _id: 1, editing: true};
      $scope.editPokemon(pokemon);
      $httpBackend.flush();

      expect(pokemon.editing).toBe(false);
    });

    it('should be able to delete a pokemon', function() {
      $httpBackend.expectDELETE('/api/v1/pokemon/1').respond(200);

      $ControllerConstructor('pokemonController', {$scope: $scope});
      var pokemon = {pokemonName: 'test name', pokemonType: 'test type', _id: 1};
      $scope.pokemons.push(pokemon);
      $scope.deletePokemon(pokemon);
      $httpBackend.flush();

      expect($scope.pokemons.length).toBe(0);
    });
  });
});
