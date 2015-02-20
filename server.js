'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var pokemonRoutes = require('./routes/pokemon_routes');
var userRoutes = require('./routes/user_routes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/pokemonapp_development');

var app = express();
app.set('appSecret', process.env.SECRET || 'OMGCHANGETHIS');
app.use(passport.initialize());
require('./lib/passport')(passport);

var pokemonRouter = express.Router();
var userRouter = express.Router();

pokemonRoutes(pokemonRouter);

userRoutes(userRouter, passport, app.get('appSecret'));

app.use('/api/v1', pokemonRouter);
app.use('/api/v1', userRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
