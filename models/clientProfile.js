var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var clientProfileSchema = new Schema({
  clientImage:{
    type:String,
    default:'noImage.png'
  },
  age:{
   type: Number,
  },
  description:{
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
 }
});
module.exports=clientProfileSchema;
