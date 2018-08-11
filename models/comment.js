var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    time :{type: Date},
    description:{type:String},
    name:{type:String},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userImage:{type:String},
    post:{type: Schema.Types.ObjectId, ref: 'Post'}
});

schema.post('remove', function (comment) {
    User.findById(comment.user, function (err, user) {
        user.comments.pull(comment);
        user.save();
    });
});

module.exports = mongoose.model('Comment', schema);
