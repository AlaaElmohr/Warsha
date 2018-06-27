var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Job = require('../models/job');
var Client= require('../models/client');
var User= require('../models/user');

var FeedBack= require('../models/feedback');
var Application= require('../models/application');
var Contract= require('../models/contract');

router.get('/:id/:status', function (req, res, next) {
  let id=req.params.id;
  let status=req.params.status;
  FeedBack.find({job:id,status:status})
        .exec(function (err, feedback) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: feedback
            });

        });

});
router.post('/:id', function (req, res, next) {
    var type=req.query.type;
        Contract.findById(req.params.id)
        .exec(function (err, contract) {
          var feedback=new FeedBack({
              stars:req.body.stars,
              comment:req.body.comment,
              job:contract.job,
              user:contract.user,
              client:contract.client
          });

          if(type === 'user'){
            feedback.status='fromUserToClient';
            Client.findById(contract.client)
          .exec(function (err, client) {
            client.feedbacks.push(feedback);
            client.stars= ((client.stars*(client.jobDoneCount-1)) + req.body.stars) / (client.jobDoneCount);
            client.save()
          })
          }
          if(type === 'client'){
            feedback.status='fromClientToUser';
            User.findById(contract.user)
             .exec(function (err, user) {
            user.feedbacks.push(feedback);
            user.stars= ((user.stars*(user.jobDoneCount-1)) + req.body.stars) / (user.jobDoneCount);
            user.save()
          })
          }
          Job.findById(contract.job)
           .exec(function (err, job) {
          job.feedbacks.push(feedback);
          job.save()
        })
          contract.feedbacks.push(feedback);
          feedback.save();
          contract.save(function (err, result) {
            res.status(201).json({
                message: 'Saved post',
                obj: result
            });
          })
        })
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
  var decoded = jwt.decode(req.query.token);

    Job.findById(req.params.id)
        .exec(function (err, post) {
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
            res.status(200).json({
                message: 'Success',
                obj: post
            });
        });
});

module.exports = router;
