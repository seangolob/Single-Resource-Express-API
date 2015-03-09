'use strict';

process.env.MONGO_URI = 'mongodb://localhost/pokemonapp_test';
require('../../server.js');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

describe('pokemons api end points', function() {
  after(function(done){
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should respond to a post request', function(done){
    chai.request('localhost:3000/api/v1')
      .post('/pokemon')
      .send({pokemonName: 'test pokemon', pokemonType: 'test type'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.pokemonName).to.eql('test pokemon');
        expect(res.body.pokemonType).to.eql('test type');
        done();

      });
  });

  it('should have a default type', function(done){
    chai.request('localhost:3000/api/v1')
      .post('/pokemon')
      .send({pokemonName: 'test pokemon'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.pokemonType).to.eql('Normal');
        done();
      });
  });

  describe('already has data in database', function() {
    var id;
    beforeEach(function(done){
      chai.request('localhost:3000/api/v1')
        .post('/pokemon')
        .send({noteBody: 'test pokemon'})
        .end(function(err, res) {
          id = res.body._id;
          done();
        });
    });

    it('should have an index', function(done) {
      chai.request('localhost:3000/api/v1')
        .get('/pokemon')
        .end(function(err, res){
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.be.true; // jshint ignore:line
          done();
        });
    });

    it('should be able to update a pokemon', function(done) {
      chai.request('localhost:3000/api/v1')
        .put('/pokemon/' + id)
        .send({pokemonName: 'new test name'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.pokemonName).to.eql('new test name');
          done();
        });
    });

    it('should be able to delete a pokemon', function(done) {
      chai.request('localhost:3000/api/v1')
        .delete('/pokemon/' + id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.be.true; // jshint ignore:line
          expect((res.body)[0]._id).to.eql(id);
          done();
        });
    });
  });
});
