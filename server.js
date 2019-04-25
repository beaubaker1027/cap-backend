const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser')
const path = require('path');
const config = require('./private/config')

const auth = require('./routes/auth');
const user = require('./routes/user');
const settings = require('./routes/settings');
const container = require('./routes/container');
const item = require('./routes/item');

//connect to database(mlab)
mongoose.connect(config.mLab.path, {useNewUrlParser: true })
.then(() => {
  return console.log('\x1b[90;3m--connected to database\n\x1b[0m')
})
.catch((err) => {
  return console.log('couldn\'t connect to database\nError: '+err)
});
//creating an instance of express
const app = express();

//implementing cross origin resource sharing
app.use(cors());

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

//passport init
app.use(passport.initialize());
app.use(passport.session());

//pointer to passport file for passport
require('./private/passport')(passport);

//routes
app.get('/express_backend', (req, res) => {
  res.json({success:true, msg:'Connection', data:'You are connected to the Express Backend'});
})
app.use('/auth', auth);
app.use('/user', user);
app.use('/container', container);
app.use('/settings', settings);

//app listener
app.listen(config.port, () => console.log(`Cap listening on port ${config.port}\n`))
