var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validator=require('validator');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var schema = new Schema({
    title:{
         type:String
     },
    description:{
      type: String,
    },
   categories:{
      type: String,
    },
    salary:{
       type: Number,
     },
     jobType:{
        type: String,
      },
    skills:[{
      type: String,
    }],
    deadline:{
      type: Number,
    },
    country:{
      type: String,
    },
    city:{
      type: String,
    },
    address:{
      type: String,
    },
    complete:{
      type: String,
      default:'no'
    },
   client: {type: Schema.Types.ObjectId, ref: 'Client'},
   feedbacks: [{type: Schema.Types.ObjectId, ref: 'FeedBack'}],
   applications: [{type: Schema.Types.ObjectId, ref: 'Application'}],
  contract: {type: Schema.Types.ObjectId, ref: 'Contract'},
});
schema.index({'title': 'text'});

schema.virtual('appliationCount').get(function(){
  return this.applications.length;
});
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Job', schema);
