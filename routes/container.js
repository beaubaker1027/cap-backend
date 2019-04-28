const express = require('express');
const passport = require('passport');
const router = express.Router();

const ContainerModel = require('../models/containerModel');

router.get('/', /*passport.authenticate('jwt', {session:false}),*/ (req, res) => {
  const { username } = req.body
  ContainerModel.findContainersByUsername(username || 'beaubaker', (err, response)=>{
    console.log(response);
    if(err) {
      return res.json({success:false, msg:err})
    }
    return res.json({success:true, msg:'Returned Users\' Containers', data:response});
  })
});

router.post('/', /*passport.authenticate('jwt', {session:false}),*/ (req, res, next) => {
  const { container, user } = req.body
  console.log(container);
  console.log(user);
  ContainerModel.addContainer(/*req.user*/user, container, (err, user) => {
    if(err) return res.json({success:false, msg:err})
    return res.json({success:true, msg:'Container Added to User', user})
  });
});

router.get('/:id', /*passport.authenticate('jwt', {session:false}), */(req,res,next) => {
  const {id} = req.params
  ContainerModel.findContainerById(id, (err, data) => {
    if(err) return res.json({success:false, msg:err})
    return res.json({success:true, msg:'Retrieved Container', data: data});
  })
});

router.put('/:id', /*passport.authenticate('jwt', {session:false}),*/ (req,res,next) => {
  const { updatedContainer } = req.body
  const {id} = req.params;
  ContainerModel.updateContainer(id, updatedContainer, (err, data) => {
    if(err) return res.json({success:false, msg:err})
    return res.json({success:true, msg:'Container Updated', data:data})
  });
});

router.delete('/:id', /*passport.authenticate('jwt', {session:false}),*/ (req,res,next)=>{
  const {id} = req.params;
  ContainerModel.deleteContainer(id, (err, data) => {
    if(err){
      return res.json({success:false, msg:err});
    }
    return res.json({success:true, msg:'Container Deleted', data: data});
  })
});



module.exports = router;
