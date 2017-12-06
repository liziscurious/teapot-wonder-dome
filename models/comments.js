// <<<<<<<This is the model>>>>>>>>>

const mongoose          = require('mongoose');

const commentSchema     = mongoose.Schema({
  user: String,
  content:  { type: String, require:  true  },
  teapot: { type: mongoose.Schema.Types.ObjectId, ref:  'teapot'}
});

module.exports  = mongoose.model('Comment', commentSchema);
