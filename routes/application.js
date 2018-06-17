var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Job = require('../models/job');
var User = require('../models/user');
var Application= require('../models/application');
router.get('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
      Application.find({user:decoded.user._id})
          .exec(function (err, apps) {
              if (err) {
                  return res.status(500).json({
                      title: 'An error occurred',
                      error: err
                  });
              }
              res.status(200).json({
                  message: 'Success',
                  obj: apps
              });
          });
});
router.get('/:id', function (req, res, next) {
  let find=req.query.query;
  if(find==='job'){
      var findQuery={job:req.params.id};
  }
  else if(find==='user'){
      var findQuery={user:req.params.id};
  }
  else if(find==='application'){
    var findQuery={_id:req.params.id};
  }
      Application.find(findQuery)
          .populate({path:'user'})
          .populate({path:'job',populate:{
            path:'client'
            }})
          .exec(function (err, posts) {
              if (err) {
                  return res.status(500).json({
                      title: 'An error occurred',
                      error: err
                  });
              }
              res.status(200).json({
                  message: 'Success',
                  obj: posts
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
router.patch('/:id', function (req, res, next) {
    Application.findById(req.params.id, function (err, app) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!app) {
            return res.status(500).json({
                title: 'No application Found!',
                error: {message: 'application not found'}
            });
        }
      app.status=req.body.status;
      if(req.body.status==='inProcess'){
        User.findById(app.user, function (err, user) {
          user.jobs.push(app.job);
          user.save();
        })
      }
      Job.findById(app.job, function (err, job) {
        if(req.body.status==='inProcess'){
          job.complete='inProcess'
        }
        else if(req.body.status==='completed'){
          job.complete='yes'
        }
        job.save();
      })
      app.save(function (err, result) {
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
        var application= new Application({
            coverLetter:req.body.coverLetter,
           bid:req.body.bid,
           duration:req.body.duration,
           job:req.body.job,
          user: decoded.user._id
        });
         application.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            Job.findById(req.body.job,function (err, post) {
              if (err) {
                  return res.status(500).json({
                      title: 'An error occurred',
                      error: err
                  });
              }
              if (!post) {
                  return res.status(500).json({
                      title: 'No Post Found!',
                      error: {message: 'Post not found'}
                  });
              }
              post.applications.push(application);
              post.save();
            })
            user.applications.push(result._id);
            user.save();
            res.status(201).json({
                message: 'Saved post',
                obj: result
            });
        });

    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err,user) {
    Application.findById(req.params.id, function (err, app) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!app) {
            return res.status(500).json({
                title: 'No Job Found!',
                error: {message: 'Job not found'}
            });
        }
        if (app.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'User do not match'}
            });
        }
      //  this.messages.splice(this.messages.indexOf(message), 1);
      Job.findById(app.job, function (err, post) {

        post.applications.splice(post.applications.indexOf(req.params.id),1);
        post.save();
      })
        app.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Application',
                obj: result
            });
            user.applications.splice(user.applications.indexOf(app),1);
            user.save();
          });
        });
    });
});

module.exports = router;
