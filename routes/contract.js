var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Message = require('../models/message');
var Client= require('../models/client');
var Contract= require('../models/contract');
var Job = require('../models/job');
var Application= require('../models/application');

router.get('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
    let query=req.query.query;
    let findQuery;
    if(query==='user'){
      findQuery={user:decoded.user._id}
    }
    else{
      findQuery={client:decoded.client._id}
    }
    Contract.find(findQuery)
        .populate({path:'user'})
        .populate({path:'client'})
        .populate({path:'feedbacks'})
        .exec(function (err, contracts) {
          if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          }
            res.status(200).json({
                message: 'Success',
                obj: contracts
            });
        });
});
router.get('/:id',  function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
    Contract.findById(req.params.id)
        .populate({path:'user'})
        .populate({path:'client'})
        .populate({path:'feedbacks'})
        .exec(function (err, contract) {
          if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          }
            res.status(200).json({
                message: 'Success',
                obj: contract
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

router.post('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
    var contract = new Contract({
        title:req.body.job.title,
        startTime: Date.now(),
        duration:req.body.duration,
        budget:req.body.bid,
        status:'opened',
        user :req.body.user._id,
        client:decoded.client._id,
        job :req.body.job._id
    });
    Job.findById(req.body.job._id, function (err, job) {
        job.complete='inProcess';
        job.contract=contract;
       job.save();
    })
    User.findById(req.body.user._id, function (err, user) {
      user.contracts.push(contract);
       user.save();
    })
    Application.find({}, function (err, apps) {
      for(let app of apps){
          app.status='archieved';
         app.save();
      }
    })
    Application.findById(req.body.appId, function (err, app) {
          app.status='Hired';
          app.save();
    })
    Client.findById(decoded.client._id, function (err, client) {
      client.contracts.push(contract);
       client.save();
    })
    contract.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved Contract',
            obj: result
        });
    });
});
router.patch('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
    Job.findById(req.body.jobId, function (err, job) {
        job.complete='yes';
       job.save();
    Contract.findById(req.body.contractId, function (err, contract) {
      User.findById(req.body.user._id,function (err, user) {
        user.jobs.push(job);
        user.totalEarned=user.totalEarned+contract.budget;
        user.save();
      });
      Client.findById(req.body.client._id,function (err, client) {
        client.totalSpent=client.totalSpent+contract.budget;
        client.save();
      })
          contract.status='finished';
          contract.finishTime=Date.now();

          contract.save(function (err, result) {
              if (err) {
                  return res.status(500).json({
                      title: 'An error occurred',
                      error: err
                  });
              }
              res.status(201).json({
                  message: 'Saved Contract',
                  obj: result
              });
          });
    })
    })
});

module.exports = router;
