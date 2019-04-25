const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//user model
const User = require('../models/userModel')

//register a New User
router.post('/register', (req, res, next) => {
  const profilePic = req.file;
  const { username, name, email, password, details} = JSON.parse(req.body.user);

  // instance user
  var newUser = new User({
    username: username,
    email: email,
    details: details,
    password: password
  })

  User.addUser(newUser, (err, user) => {
    if(err){
      return res.json({success: false, msg:'Failed to register user: '+err});
    } else {
      return res.json({success: true, msg:'User registered'});
    }
  })

});

//authenticate an Existing User
router.post('/authenticate', (req, res, next) => {
  const {email, password} = req.body;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: "User not found"});
    }

    user = {
      id: user.id,
      password: user.password,
      username: user.username,
      email: user.email,
    }


    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.session.secret, {
          expiresIn: config.session.expiration
        });

        res.json({
          success: true,
          token: token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Incorrect Password'});
      }
    })
  })
});


module.exports = router;
