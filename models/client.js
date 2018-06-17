// model of Client
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validator=require('validator');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var clientProfileSchema = require('./clientProfile');
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
     profile:clientProfileSchema,
    jobs: [{type: Schema.Types.ObjectId, ref: 'Job'}],
    feedbacks: [{type: Schema.Types.ObjectId, ref: 'FeedBack'}],
    contracts: [{type: Schema.Types.ObjectId, ref: 'Contract'}],
    totalSpent:{
      type:Number,
      default:0 },
    stars:{
      type:Number,
      default:0  }
});
schema.virtual('jobPostedCount').get(function(){
  return this.jobs.length;
});
schema.virtual('jobDoneCount').get(function(){
  return this.contracts.length;
});
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Client', schema);
