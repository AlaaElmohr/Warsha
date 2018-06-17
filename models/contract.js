var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    title:{type: String},
    startTime: {type: Date},
    finishTime: {type: Date},
    duration: {type: String},
     budget :{type: Number},
    status:{type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    client: {type: Schema.Types.ObjectId, ref: 'Client'},
    job: {type: Schema.Types.ObjectId, ref: 'Job'},
    feedbacks: [{type: Schema.Types.ObjectId, ref: 'FeedBack'}]

});

module.exports = mongoose.model('Contract', schema);
