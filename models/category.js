var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var categorySchema = new Schema({
      title:{
        type: String,
      }
});
module.exports=categorySchema;
