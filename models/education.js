var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var educationSchema = new Schema({
      title:{
        type: String,
      },
      from:{
        type: Number,
      },
      to:{
        type: Number,
      },
      institue:{
        type: String,
      },
      description:{
        type: String,
      }
});
module.exports=educationSchema;
