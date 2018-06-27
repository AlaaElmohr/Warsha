var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Client = require('../models/client');
const multer=require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './assets/assets/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
var upload = multer({ storage: storage });
router.post('/signup', function (req, res, next) {
  Client.find({email:req.body.email}).exec(function (err, client) {

 if(client == ''){
    var  client= new Client({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        memberSince:Date.now()
    });
    client.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var token = jwt.sign({client: result}, 'secret', {expiresIn: 14400});
        return res.status(201).json({
            message: 'Client created',
            obj: result,
            token: token,
            clientId: result._id
        });
    });
  }
    else{
      return res.status(401).json({
          title: 'Login failed',
          error: {message: 'Email is already registered'}
      });
    }
    })
});
router.get('/:id', function (req, res, next) {
  JobPostedCount=0;
  JobDoneCount=0;
    Client.findById(req.params.id)
         .populate({path:'contracts',populate:{
           path:'feedbacks'
         }})
        .exec(function (err, client) {
          console.log("client2"+client);
            this.JobPostedCount=client.jobPostedCount;
            this.JobDoneCount=client.jobDoneCount;
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: [client,JobPostedCount,JobDoneCount]
            });
        });
});
// SignIn
router.post('/signin', function(req, res, next) {
      Client.findOne({email: req.body.email})
         .populate('client', 'name')
        .exec(function (err, client) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!client) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, client.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({client: client}, 'secret', {expiresIn: 14400});
        res.status(200).json({
            message: 'Successfully logged in',
            name:client.name,
            token: token,
            clientId: client._id
        });
    });
});
router.post('/profile', upload.array("uploads[]", 12),function (req, res, next) {
       var decoded = jwt.decode(req.query.token);
        var profile=JSON.parse(req.body.profile);
       Client.findById(decoded.client._id,function(err, client){
         console.log(client)
         client.profile={
             clientImage: req.files[0].filename,
             age: profile.age,
             description: profile.description,
             phoneNumber: profile.phoneNumber,
             websiteLink: profile.websiteLink,
             facebookLink: profile.facebookLink,
             twitterLink: profile.twitterLink,
             googleLink: profile.googleLink,
             linkedinLink: profile.linkedinLink,
             country: profile.country,
             city: profile.city,
             address: profile.address,
         };
         console.log("client"+client);
         client.save(function(err, result) {
             if (err) {
                 return res.status(500).json({
                     title: 'An error occurred',
                     error: err
                 });
             }
             res.status(201).json({
                 message: 'Profile created',
                 obj: result
             });
         });
       });
});
router.patch('/profile',upload.array("uploads[]", 12), function (req, res, next) {
       imageName='';
        var decoded = jwt.decode(req.query.token);
        var profile=JSON.parse(req.body.profile);
       Client.findById(decoded.client._id,function(err, client){
         if(req.files[0]==undefined){
           this.imageName=client.profile.clientImage;
         }
         else{
           this.imageName=req.files[0].filename;
               }
         client.profile={
             clientImage:this.imageName,
             age: profile.age,
             description: profile.description,
             phoneNumber: profile.phoneNumber,
             websiteLink: profile.websiteLink,
             facebookLink: profile.facebookLink,
             twitterLink: profile.twitterLink,
             googleLink: profile.googleLink,
             linkedinLink: profile.linkedinLink,
             country: profile.country,
             city: profile.city,
             address: profile.address,
         };

         client.save(function(err, result) {
             if (err) {
                 return res.status(500).json({
                     title: 'An error occurred',
                     error: err
                 });
             }
             res.status(201).json({
                 message: 'Profile created',
                 obj: result
             });
         });
       });
});
router.get('/profile/:id', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
       Client.findById(req.params.id)
       .populate('client','name')
       .exec(function (err, client) {
         if (err) {
             return res.status(500).json({
                 title: 'An error occurred',
                 error: err
             });
         }
         res.status(201).json({
             message: 'We Got Profile Successfully',
             obj: client
         });
});
});
// Delete Client
router.delete('/:id', function (req, res, next) {
    Client.findById(req.params.id,function(err, client){
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      if (!client) {
          return res.status(401).json({
              title: 'Login failed',
              error: {message: 'Invalid login credentials'}
          });
      }
      client.remove(function(err, result) {

          if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          }
          res.status(201).json({
              message: 'Client created',
              obj: result
          });
      });
    })
});
//Get All USers
router.get('/', function (req, res, next) {
    Client.find()
        .exec(function (err, clients) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: clients
            });
        });
});


// change client password
router.patch('/changepassword/:id', function (req, res, next) {
  Client.findById(req.params.id, function (err, client) {
    if (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
    }
    if (!client) {
        return res.status(401).json({
            title: 'Login failed',
            error: {message: 'Invalid login credentials'}
        });
    }
    client.password=bcrypt.hashSync(req.body.password, 10);
    client.save(function(err, result) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Client created',
            obj: result
        });
    });
  });
});

module.exports = router;
