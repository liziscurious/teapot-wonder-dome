// <<<<<<<This is the model>>>>>>>>>
const mongoose      = require('mongoose');

const teapotSchema  = mongoose.Schema({
  url:  { type: String, require: true },
  submitted_by: { type: String, require: true}
});

module.exports  = mongoose.model('Teapot', teapotSchema);
