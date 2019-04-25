const express = require('express');
const passport = require('passport');
const router = express.Router();

const ContainerModel = require('../models/containerModel');

router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
  const { containers } = req.user
  return res.json({success: true, msg:'Returned Users\' Containers', data:containers})
});

router.post('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const { container } = req.body
  ContainerModel.addContainer(req.user, container, (err, user) => {
    if(err) return res.json({success:false, msg:err})
    return res.json({success:true, msg:'Container Added to User', user})
  });
});

router.get('/:id', passport.authenticate('jwt', {session:false}), (req,res,next) => {
  const { containers } = req.user
  const {id} = req.params
  ContainerModel.findContainerById(id, containers, (err, data) => {
    if(err) return res.json({success:false, msg:err})
    return res.json({success:true, msg:'Retrieved Container', data: data});
  })
});

router.put('/:id', passport.authenticate('jwt', {session:false}), (req,res,next) => {
  const { user } = req;
  const { containers } = req.user;
  const { updatedContainer } = req.body
  const {id} = req.params;
  ContainerModel.findContainerById(id, containers, (err, data) => {
    if(err) return res.json({success:false, msg:err})
    ContainerModel.updateContainer(user, data, container, (err, user) => {
      if(err) return res.json({success:false, msg:err})
      return res.json({success:true, msg:'Container Updated', user})
    });
  })
});

/*router.delete('/:id', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
  const { containers } = req.user;
  const {id} = req.params;
  ContainerModel.findContainerById(id, containers, (err, data) => {
    if(err) return res.json({success:false, msg:err})
    ContainerModel.updateContainer(user, data, container, (err, user) => {
      if(err) return res.json({success:false, msg:err})
      return res.json({success:true, msg:'Container Updated', user})
    });
  })
})*/



module.exports = router;
