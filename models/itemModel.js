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
    default: 'A container without any identifiers'
  }
});

var item = mongoose.model('item', itemSchema);

module.exports = item;
