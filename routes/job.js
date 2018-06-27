var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Job = require('../models/job');
var Client= require('../models/client');

router.get('/', function (req, res, next) {
  let findQuery;
  var filter1=req.query.query;
  var filter=JSON.parse(filter1);
  if(filter.city === undefined){
   findQuery={};
  }
  else if(filter.budget===undefined && filter.jobType === undefined && filter.category === undefined && filter.city !== undefined && filter.title !== undefined){
   findQuery={$text:{ $search: filter.title },city:filter.city};
  }
  else{
    lsBudget=filter.budget+100;
    filter.budget.sort();
    lessbudget=filter.budget[filter.budget.length-1]+100;
  findQuery={city:filter.city,categories:filter.category,jobType:filter.jobType,salary:{"$gte":filter.budget[0],"$lte":lessbudget}};
  if(filter.city === ''){
   delete findQuery.city
  }
  if(filter.title === ''){
   delete findQuery.title
  }
  if(filter.category.length === 0){
   delete findQuery.categories
  }
  if(filter.budget.length === 0){
   delete findQuery.salary
  }
  if(filter.jobType.length === 0){
   delete findQuery.jobType;
  }
}
   appCount=[];
    Job.find(findQuery)
        .populate({path:'client'})
        .exec(function (err, posts) {
          for(let post of posts){
            this.appCount.push(post.appliationCount);
          }
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: [posts,appCount]
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
  var decoded = jwt.decode(req.query.token);
    Job.findById(req.params.id)
          .populate({path:'client',populate:{
            path:'contracts',
            populate:{
              path:'feedbacks'
            }
          }})
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
                obj: [post,post.appliationCount]
            });
        });
});
router.post('/', function (req, res, next) {
  console.log(req.body.categories);
    var decoded = jwt.decode(req.query.token);
    Client.findById(decoded.client._id, function (err, client) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var post= new Job({
            title:req.body.title,
            description:req.body.description,
           categories:req.body.categories,
           salary:req.body.salary,
           jobType:req.body.jobType,
           skills:req.body.skills,
           deadline:req.body.deadline,
           country:req.body.country,
           city:req.body.city,
          address:req.body.address,
          client: decoded.client._id
        });
        post.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            client.jobs.push(result._id);
            client.save();
            res.status(201).json({
                message: 'Saved post',
                obj: result
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Job.findById(req.params.id, function (err, post) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!post) {
            return res.status(500).json({
                title: 'No Job Found!',
                error: {post: 'Job not found'}
            });
        }
        if (post.client != decoded.client._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Clients do not match'}
            });
        }
        post.content = req.body.content;
        post.title=req.body.title;
        post.description=req.body.description;
       post.categories=req.body.categories;
       post.salary=req.body.salary;
       post.skills=req.body.skills;
       post.deadline=req.body.deadline;
       post.country=req.body.country;
       post.city=req.body.city;
       post.address=req.body.address;
        post.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Post',
                obj: result
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Job.findById(req.params.id, function (err, job) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!job) {
            return res.status(500).json({
                title: 'No Job Found!',
                error: {message: 'Job not found'}
            });
        }
        if (job.client != decoded.client._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Clients do not match'}
            });
        }
        job.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Post',
                obj: result
            });
        });
    });
});

module.exports = router;
