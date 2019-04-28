const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  details:{
    type: String,
    required: false,
    trim: true,
    default: 'An item without any identifiers'
  }
},
{
  runSettersOnQuery: true,
  timestamps: true
});

module.exports = itemSchema;
