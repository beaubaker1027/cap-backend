const express = require('express');
const passport = require('passport');
const router = express.Router();

const ContainerModel = require('../models/containerModel');

router.get('/:containerId/:itemId', /*passport.authenticate('jwt', {session:false}),*/ (req, res) => {
  //const { username } = req
  const { containerId, itemId } = req.params
  ContainerModel.findItemById(containerId, itemId, (err, response)=>{
    if(err) {
      return res.json({success:false, msg:err})
    }
    return res.json({success:true, msg:'Returned Item', data:response});
  })
});

router.post('/:containerId', /*passport.authenticate('jwt', {session:false}),*/ (req, res) => {
  const { containerId } = req.params
  const { item } = req.body
  ContainerModel.addItem(containerId, item, (err, response)=>{
    if(err){
      return res.json({success:false, msg:err})
    }
    return res.json({success:true, msg:'Added Item', data:response})
  })
})

router.put('/:containerId/:itemId', /*passport.authenticate('jwt', {session:false}),*/ (req, res) => {
  const { containerId, itemId } = req.params
  const { item } = req.body
  ContainerModel.updateItem(containerId, itemId, item, (err, response)=>{
    if(err){
      return res.json({success:false, msg:err})
    }
    return res.json({success:true, msg:'Updated Item', data:response})
  })
})

router.delete('/:containerId/:itemId', /*passport.authenticate('jwt', {session:false}),*/ (req, res) => {
  const { containerId, itemId } = req.params
  ContainerModel.removeItemById(containerId, itemId, (err, response)=>{
    if(err){
      return res.json({success:false, msg:err})
    }
    return res.json({success:true, msg:'Removed Item', data:response})
  })
});

module.exports = router;