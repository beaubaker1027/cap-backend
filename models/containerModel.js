const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = require('./itemModel');

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
  admin:{
    type: String,
    required: true,
    trim: true,
  },
  users:[{
    type: String,
    required: true,
    trim: true,
  }],
  contents:[ItemSchema]
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
  Container.findOneAndDelete({_id:id}, (err, doc)=>{
    if(err){
      return callback(err, null);
    }
    return callback(null, doc);
  })
}

// find an item in contents
module.exports.findItemById = (containerId, itemId, callback)=>{
  Container.findOne({ _id:containerId, contents:{ _id: itemId } } , "contents.$", (err, doc) => {
    if(err){
      return callback(err, null);
    }
    return callback(null, doc);
  })
}

//add an Item in contents
module.exports.addItem = (containerId, item, callback)=>{
  Container.findOneAndUpdate({ _id:containerId }, { $push: { contents: item } }, {setDefaultsOnInsert: true, new:true}, async (err, doc) => {
    if(err){
      return callback(err, null);
    }
    return callback(null, doc)
  })
}

//update an item in contents
module.exports.updateItem = (containerId, itemId, item, callback)=>{
  item._id = itemId;
  Container.findOneAndUpdate({ _id:containerId, contents: { $elemMatch: { _id: itemId } } }, { $set: { "contents.$": item } }, { new:true }, (err, doc) => {
    if(err){
      return callback(err, null);
    }
    return callback(null, doc)
  })
}

//remove an item in contents
module.exports.removeItemById = (containerId, itemId, callback)=>{
  Container.findOneAndUpdate({ _id:containerId }, { $pull: { contents: { _id:itemId } } }, { new: true }, (err, doc) => {
    if(err){
      return callback(err, null);
    }

    return callback(null, doc)
  })
}
