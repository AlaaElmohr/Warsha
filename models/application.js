// model of Client
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validator=require('validator');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var schema = new Schema({
    coverLetter:{
      type: String,
    },
    bid:{
       type: Number,
     },
    duration:{
      type: String,
    },
    status:{
      type: String,
      default:'pending'
    },
   job: {type: Schema.Types.ObjectId, ref: 'Job'},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

//userSchema.pre('remove',function(next){
//  const BlogPost=mongoose.model('blogPost');
//  BlogPost.remove({_id:{$in:this.blogPosts}}).then(()=>{next()});
//})
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Application', schema);
