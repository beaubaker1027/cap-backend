const express = require('express');
const passport = require('passport');
const router = express.Router();

const SettingsModel = require('../models/settingsModel')
const FeedbackModel = require('../models/feedbackModel');

//get request to retrieve user settings
router.get('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {

  const {user} = req;

  SettingsModel.findSettings(user, (err, settings) => {
    if(err) res.json({success: false, msg:err});

    res.json({success:true, msg:'User Settings Found', data: settings});
  })
});

//put request to update user setting
router.put('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const { updatedSettings } = req.body
  const { user } = req
  SettingsModel.updateSettings(user, updatedSettings, (err, user) => {
    const { settings } = user
    if(err) res.json({success:false, msg: err })
    res.json({success: true, msg: 'User Settings Updated', data: settings})
  })
});

router.get('/feedback', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const { settings } = req.user

  FeedbackModel.findFeedback(settings, (err, feedback) =>{
    if(err) res.json({success:false, msg: err });
    res.json({success: true, msg: 'User Feedback Retrieved', data: feedback});
  })
})

router.post('/feedback', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
  const {user} = req;
  const {feedback} = req.body
  FeedbackModel.postFeedback(user, feedback, (err, user) => {
    const {feedback} = user.settings;
    if(err) res.json({success:false, msg:err});
    res.json({success:false, msg: 'Feedback Posted', data: feedback})
  })
})

router.delete('/feedback', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
  const {user} = req;
  const { feeback } = req.body
  FeedbackModel.removeFeedbackById(user, feedback, (err, user)=>{
    const {feedback} = user.settings;
    if(err) res.json({success:false, msg:err});
    res.json({success:true, msg: 'Feedback Deleted', data: feedback})
  })
})
module.exports = router;
