// <<<<<<<This is the model>>>>>>>>>
const mongoose      = require('mongoose');

const teapotSchema  = mongoose.Schema({
  url:  { type: String, require: true },
  nameOfTeapot: { type: String, require: true },
  material: String,
  writeUp: { type: String, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref:  'User'}
});

module.exports  = mongoose.model('Teapot', teapotSchema);
