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
  username:{
    type: String,
    required: true,
    trim: true,
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

var Container = mongoose.model('container', containerSchema);


module.exports = containerSchema;

module.exports.findContainerById = (id, callback)=>{
  Container.findById(id, (err, doc)=>{
    if(err){
      return callback(err, null);
    }
    callback(null, doc);
  })
}

module.exports.findContainersByUsername = (username, callback)=>{
  Container.find({username:username}, (err, docs)=>{
    if(err){
      return callback(err, null);
    }
    return callback(null, docs)
  })
}

module.exports.addContainer = (user, container, callback) => {
  container.username = user;
  let newContainer = new Container(container);
  newContainer.save((err, doc)=>{
    if(err) {
      return callback(err, null);
    }
    console.log(doc+'saved');
    return callback(null, doc);
  })
}

module.exports.updateContainer = (id, updatedContainer, callback) => {
  Container.findOneAndUpdate({_id:id}, updatedContainer,{new:true}, (err, doc)=>{
    if(err){
      return callback(err, null);
    }
    return callback(null, doc);
  })
}

module.exports.deleteContainer = (id, callback)=>{
  console.log('ID:',id);
  Container.findOneAndDelete({_id:id}, (err, doc)=>{
    if(err){
      return callback(err, null);
    }
    return callback(null, doc);
  })
}
