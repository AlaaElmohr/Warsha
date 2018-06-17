var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var shema = new Schema({
      stars:{
        type: Number,
      },
      comment:{
        type: String,
      },
      status:{
        type: String,
      },
      job:{type: Schema.Types.ObjectId, ref: 'Job'},
      user:{type: Schema.Types.ObjectId, ref: 'User'},
     client:{type: Schema.Types.ObjectId, ref: 'Client'}
});
module.exports = mongoose.model('FeedBack', shema);
