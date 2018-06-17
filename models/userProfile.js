var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var educationSchema = require('./education');
var workSchema = require('./workExperience');
var userProfileSchema = new Schema({
  userImage:{
    type:String,
    default:'noImage.png'
  },
  jobTitle:{
    type: String,
  },
  educationLevel:{
    type: String,
  },
  age:{
    type: Number,
  },
  languages:[{
    type: String,
  }],
  experience:{
    type: Number,
  },
  coverLetter:{
    type: String,
  },
  phoneNumber:{
    type: Number,
  },
  websiteLink:{
    type: String,
  },
  facebookLink:{
    type: String,
  },
  twitterLink:{
    type: String,
  },
  googleLink:{
    type: String,
  },
  linkedinLink:{
    type: String,
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
  categories:{
    type: String,
  },
  workExperience:workSchema,
  education:educationSchema
});
module.exports=userProfileSchema;
