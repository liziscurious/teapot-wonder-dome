// <<<<<<<This is the model>>>>>>>>>

const mongoose          = require('mongoose');

const commentSchema     = mongoose.Schema({
  content:  { type: String, require:  true  },
  teapot: { type: mongoose.Schema.Types.ObjectId, ref:  'teapot'},
  user: { type: mongoose.Schema.Types.ObjectId, ref:  'User'}
});

module.exports  = mongoose.model('Comment', commentSchema);
