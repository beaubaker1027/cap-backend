const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/userModel');

router.get('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const { user } = req
  user = {
    username: user.username,
    email: user.email,
    details: user.details,
    created: user.createdAt,
    updated: user.updatedAt
  }
  res.json({success: true, msg:'User Retrieved', data: user })
});

router.put('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const { user } = req;
  const { updatedUser } = req.body

  user.updateUser(user, updateUser, (err, user)=>{
    if(err) res.json({success:false, msg:err});
    res.json({success:true, msg:'User Updated Successfully', data:user})
  })

})

module.exports = router;
