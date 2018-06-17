// model of User
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validator=require('validator');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var userProfileSchema = require('./userProfile');
var feedBackShema = require('./feedback');
var schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    require:true,
    minlength:6
  },
    name: {
      type: String,
       required: true
     },
  memberSince:Date,
   profile:userProfileSchema,
   messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
   applications: [{type: Schema.Types.ObjectId, ref: 'Application'}],
   jobs: [{type: Schema.Types.ObjectId, ref: 'Job'}],
   posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
   feedbacks: [{type: Schema.Types.ObjectId, ref: 'FeedBack'}],
   contracts: [{type: Schema.Types.ObjectId, ref: 'Contract'}],
   comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
   totalEarned:{
     type:Number,
    default:0 },
     stars:{
     type:Number,
     default:0
    },
});
schema.virtual('jobDoneCount').get(function(){
  return this.contracts.length;
});
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
