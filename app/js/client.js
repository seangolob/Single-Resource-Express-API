'use strict';

var React = require('react');
var ajax = require('jquery').ajax;

var pokemonData = [{pokemonName: 'Sean', _id: 1}];

var PokemonForm = React.createClass({
  getInitialState: function() {
    return {newPokemon: {pokemonName: ''}};
  },
  handleChange: function(event) {
    this.setState({newPokemon: {pokemonName: event.target.value}});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var newPokemon = this.state.newPokemon;
    ajax({
      url: this.props.url,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(newPokemon),
      success: function(data) {
        this.props.onNewPokemonSubmit(data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
    this.setState({newPokemon: {pokemonName: ''}});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="newpokemonname">Pokemon Name</label>
        <input id="newpokemonname" type="text" value={this.state.newPokemon.pokemonName} onChange={this.handleChange}/>
        <button type="submit">Create New Pokemon</button>
      </form>
    )
  }
});

var Pokemon = React.createClass({
  render: function() {
    return <li>{this.props.data.pokemonName}</li>
  }
});

var PokemonList = React.createClass({
  render: function() {
    var pokemons = this.props.data.map(function(pokemon) {
      return <Pokemon data={pokemon} key={pokemon._id}/>
    });
    return (
      <section>
        <h1>Pokemon:</h1>
        <ul>
          {pokemons}
        </ul>
      </section>
    )
  }
});

var PokemonApp = React.createClass({
  getInitialState: function() {
    return {pokemonData: []};
  },
  onNewPokemon: function(pokemon) {
    pokemon._id = this.state.pokemonData.length + 1;
    var stateCopy = this.state;
    stateCopy.pokemonData.push(pokemon);
    this.setState(stateCopy);
  },
  componentDidMount: function() {
    ajax({
      url: this.props.pokemonBaseUrl,
      dataType: 'json',
      success: function(data) {
        var state = this.state;
        state.pokemonData = data;
        this.setState(state);
      }.bind(this),
      error: function(xhr, status) {
        console.log(xhr, status);
      }
    });
  },
  render: function() {
    return (
      <main>
        <PokemonForm onNewPokemonSubmit={this.onNewPokemon} url={this.props.pokemonBaseUrl}/>
        <PokemonList data={this.state.pokemonData} />
      </main>
    )
  }
});

React.render(<PokemonApp pokemonBaseUrl={'/api/v1/pokemon'}/>, document.body);
