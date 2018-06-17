var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var workShema = new Schema({
      title:{
        type: String,
      },
      from:{
        type: Number,
      },
      to:{
        type: Number,
      },
     company:{
        type: String,
      },
      description:{
        type: String,
      }
});
module.exports=workShema ;
