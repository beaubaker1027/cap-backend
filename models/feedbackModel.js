const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const feedbackSchema = new Schema({
  stars: {
    type: Number,
    required: false,
  },
  comment:{
    type: String,
    required: false,
    trim: true,
  },
});


module.exports = feedbackSchema;

module.exports.findFeedback = (settings, callback) => {
  const { feedback } = settings;
  if(!feedback) return callback('Feedback Not Found', null);
  return callback(null, feedback)
}

module.exports.postFeedback = (user, newFeedback, callback) => {
  const { feedback } = user.settings;

  user.settings.feedback = feedback.unshift(newFeedback);
  user.save(callback);
}

module.exports.removeFeedbackById = (user, feedbackToDelete, callback)=>{
  const {id} = feedbackToDelete;
  const {feedback} = user.settings;
  var index = feedback.indexOf(feedback.filter(el => el.id === id))
  if(index < 0) return callback('Feedback Post Not Found', null);
  feedback.splice(index, 1)
  user.settings.feedback = feedback;
  user.save(callback)
}
