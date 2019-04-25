const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedbackSchema = require('./feedbackModel')

mongoose.set('useCreateIndex', true);

const settingsSchema = new Schema({
  darkMode: {
    type: Boolean,
    default: false,
    required: true,
  },
  language:{
    type: String,
    default: 'en',
    required: true,
    trim: true,
  },
  feedback: [feedbackSchema]
});


module.exports = settingsSchema;

module.exports.findSettings = (user,callback)=>{
  const {settings} = user;
  if(!settings) return callback('Settings Not Found', null);
  return callback(null, settings)
}

module.exports.updateSettings = (user, updatedSettings, callback)=>{
  user.settings = Object.assign(user.settings, updatedSettings);
  user.save(callback)
}
