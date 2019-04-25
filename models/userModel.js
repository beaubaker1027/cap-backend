const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const containerSchema = require('./containerModel');
const settingsSchema = require('./settingsModel');

mongoose.set('useCreateIndex', true);

//user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  details:{
    type: String,
    required: false,
    trim: true,
    default: 'An undescribed user with inventory that needs managed',
  },
  containers: [containerSchema],
  settings: [settingsSchema],
},
{
  runSettersOnQuery: true,
  timestamps: true
});

userSchema.pre('save', (next) => {
  this.email = this.email.toLowerCase();
  var currentDate = new Date().getTime();
  this.updatedAt = currentDate;
  if(!this.createdAt){
    this.createdAt = currentDate;
  }
  next();
})

//populate data after a find data request
userSchema.post('find', (result)=>{
  result.populate('containers.content')
})

//instantiation of the user model
var user = mongoose.model('user', userSchema);

//export of the user model
module.exports = user;

//find a user by id
module.exports.getUserById = (id, callback) => {
  user.findById(id, callback);
}

//find a user by username
module.exports.getUserByUsername = function(username, callback){
  const query = {username:username};
  user.findOne(query, callback);
}

//find container
module.exports.findContainerbyName = (username, name, callback) => {
  const query = {username:username, containers: { name: name}}
  user.findOne(query, callback);
}

//find a container that contains item
module.exports.findContainersbyItem = (username, item, callback) => {
  const query = {username:username}
  user.findOne(query)
    .populate('containers.content')
    .exec((err,data)=>{
      let containers = data.containers;
      var filtered = containers.filter((el) => {
        return el.content.some(el => el.name === item)
      })
      if(filtered) filtered = filtered.map((item) => {return {name: item.name, details: item.details}})
      return JSON.parse(JSON.stringify(filtered))
    })
}

//find each item in a container
module.exports.findItemsinContainer = (name, callback) => {
  let itemArray = [];
  user.find()
}

//create encrypted password
module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    })
  })
}

//compare encryptions
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  })
}

//update user
module.exports.updateUser = function(user, updatedUser, callback){
  Object.assign(user, updatedUser)
  user.save(callback)
}
