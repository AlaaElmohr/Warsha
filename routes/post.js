var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Message = require('../models/message');
var Client= require('../models/client');
var Comment= require('../models/comment');
var Post= require('../models/post');

router.get('/', function (req, res, next) {
  CommentsCount=[];
    Post.find()
        .populate('user', 'name')
        .exec(function (err, posts) {
          for(let post of posts){
            this.CommentsCount.push(post.commentsCount);
          }
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: [posts,CommentsCount]
            });
        });
});

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
      Post.findById(req.params.id)
       .populate('user', 'name')
       .populate({path:'comments'})
        .exec(function (err, post) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: post
            });
        });
});
router.post('/:id/comment', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Post.findById(req.params.id)
      .exec(function (err, post) {
          if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          }
          var comment= new Comment({
              description: req.body.description,
              time: req.body.time,
              name:req.body.userName,
              user: decoded.user._id,
              post:post._id
          });
           comment.save(function (err, result) {
               if (err) {
                   return res.status(500).json({
                       title: 'An error occurred',
                       error: err
                   });
               }
               User.findById(decoded.user._id)
               .exec(function (err, user) {
                 user.comments.push(comment);
                 user.save();
                 });
               post.comments.push(comment);
               post.save();
               res.status(201).json({
                   message: 'Saved comment',
                   obj: result
               });
        });
      });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var post = new Post({
            title: req.body.title,
            description: req.body.description,
            categories: req.body.categories,
            tags:req.body.tags,
            time: req.body.time,
            user: user._id
        });
        post.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.posts.push(result._id);
            user.save();
            res.status(201).json({
                message: 'Saved Blog Post',
                obj: result
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!post) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        if (post.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        post.title = req.body.title;
        post.description= req.body.description;
        post.categories= req.body.categories;
        post.tags= req.body.tags;
        post.time= req.body.time;
        post.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
        user.posts[user.posts.indexOf(req.params.id)]=post;
        user.save();
    });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function (err, user) {
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!post) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        if (post.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        post.remove(function (err, result) {
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
        for(let comment of post.comments){
          Comment.findById(comment, function (err, comment) {
              comment.remove();
              user.comments.splice(user.comments.indexOf(comment),1);
              user.save();
          })
        }
        user.posts.splice(user.posts.indexOf(req.params.id),1);
        user.save();
    });
  });
});

module.exports = router;
