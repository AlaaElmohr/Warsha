var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Message = require('../models/message');
var Client= require('../models/client');
var Comment= require('../models/comment');
var Post = require('../models/post');
router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});
router.get('/:id', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function (err, user) {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
    Comment.find({post:req.params.id})
         .populate('user', 'name')
        .exec(function (err, comments) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!comments) {
                return res.status(500).json({
                    title: 'No Message Found!',
                    error: {message: 'comment not found'}
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: comments
            });
        });
      });
});
router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!comment) {
            return res.status(500).json({
                title: 'No Comment Found!',
                error: {message: 'Comment not found'}
            });
        }
        Post.findById(comment.post, function (err, post) {
          post.comments.splice(post.comments.indexOf(req.params.id),1);
          post.save();
        });
        comment.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
        user.comments.splice(user.comments.indexOf(req.params.id),1);
        user.save();
    });
  });
});

module.exports = router;
