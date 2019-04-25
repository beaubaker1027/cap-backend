const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const containerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  details:{
    type: String,
    required: false,
    trim: true,
    default: 'A container without any identifiers'
  },
  contents:[{
    type: Schema.Types.ObjectId,
    ref: 'item'
  }]
},
{
  runSettersOnQuery: true,
  timestamps: true
});

//var container = mongoose.model('container', containerSchema);


module.exports = containerSchema;

module.exports.findContainerById = (id, containers, callback)=>{
  let results = containers.filter(el => el.id === id);
  if(results.length > 1) return callback(`Error: More than One Container Found`, null);
  !results
  ?callback(`Error: No containers containing id ${id}`, null)
  :callback(null, results);
}

module.exports.addContainer = (user, container, callback) => {
  user.containers.unshift(container);
  user.save(callback)
}

module.exports.updateContainer = (user, container, updatedContainer, callback) => {
  const index = user.containers.indexOf(container);
  user.container[index] = Object.assign(container, updatedContainer)
  user.save(callback);
}

module.exports.deleteContainer = (user, container, callback)=>{
  const index = user.containers.indexOf(container);
  const removed = user.containers.splice(index, 1)
  user.save(callback);
}
