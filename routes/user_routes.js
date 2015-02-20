'use strict';

var bodyParser = require('body-parser');
var User = require('../models/User.js');

module.exports = function(app, passport, appSecret) {
  app.use(bodyParser.json());
  app.post('/create_user', function(req, res){
    console.log('hit create user!');
    var newUser = new User();
    newUser.basic.email = req.body.email;
    newUser.basic.password = newUser.hashPassword(req.body.password);
    newUser.username = req.body.username;
    newUser.save(function(err, user){
      if (err) return res.status(500).send({msg: 'could not create user'});

      res.json({msg: 'user created'});
    });
  });

  app.get('/sign_in', passport.authenticate('basic', {session: false}), function(req, res){
    console.log('i hit get');
    req.user.generateToken(appSecret, function(err, token){
      if (err) return res.status(500).send({msg: 'could not generate token'});
      res.json({token: token});
    });
  });
}
