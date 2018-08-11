var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    time :{type: Date},
    title:[{type:String}],
    description:[{type:String}],
    categories:{type:String},
    postImage:{
      type:String,
      default:'noImage.png'
    },
    tags:[{type:String}],
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});
schema.virtual('commentsCount').get(function(){
  return this.comments.length;
});
schema.post('remove', function (post) {
    User.findById(post.user, function (err, user) {
        user.posts.pull(post);
        user.save();
    });
});

module.exports = mongoose.model('Post', schema);
