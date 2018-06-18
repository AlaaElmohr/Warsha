var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Profile = require('../models/userProfile');
var User = require('../models/user');
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
  User.find({email:req.body.email}).exec(function (err, user) {
    if (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
    }
   if(user == ''){
      var newUser = new User({
          name: req.body.name,
          password: bcrypt.hashSync(req.body.password, 10),
          email: req.body.email,
          memberSince:Date.now()
      });
      newUser.save(function(err, result) {
          if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          }
          var token = jwt.sign({user: result}, 'secret', {expiresIn: 14400});
          return res.status(201).json({
              message: 'User created',
              obj: result,
              token: token,
              userId: result._id
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

// SignIn
router.post('/signin', function(req, res, next) {
      User.findOne({email: req.body.email})
        .populate('user', 'name')
        .exec(function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Sorry, we could not find an account with that Email'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Sorry, that password is not right'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 14400});
        res.status(200).json({
            message: 'Successfully logged in',
            name:user.name,
            token: token,
            userId: user._id
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
// Delete User
router.delete('/:id', function (req, res, next) {
    User.findById(req.params.id,function(err, user){
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      if (!user) {
          return res.status(401).json({
              title: 'Login failed',
              error: {message: 'Invalid login credentials'}
          });
      }
      user.remove(function(err, result) {

          if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          }
          res.status(201).json({
              message: 'User created',
              obj: result
          });
      });
    })
});
//Get All USers
router.get('/', function (req, res, next) {
  let findQuery;
  var decoded = jwt.decode(req.query.token);
  var filter1=req.query.query;
  var filter=JSON.parse(filter1);
   let city='profile.city';
  let categories='profile.categories';
  let find=['profile.city','profile.categories'];
  console.log("filter" + filter.city+filter.rate+filter.category);
  if(filter.city === undefined ){
   findQuery={};
  }
  else{
  findQuery={'profile.city':filter.city,'profile.categories':filter.category,stars:filter.rate};
  if(filter.city === ''){
   delete findQuery['profile.city']
  }
  if(filter.category.length === 0){
   delete findQuery['profile.categories']
  }
  if(filter.rate.length === 0){
   delete findQuery.stars;
  }
}
         User.find(findQuery)
        .exec(function (err, users) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: users
            });
        });
});
// find user with name
router.get('/:id', function (req, res, next) {
  let findQuery;
  JobDoneCount=[];
  if(req.query.query==='id'){
    findQuery={_id:req.params.id}
  }
  if(req.query.query==='name'){
    findQuery={name:req.params.id}
  }
    User.find(findQuery)
          .populate({path:'contracts',populate:{
            path:'feedbacks'
          }})
        .exec(function (err, users) {
          for(let user of users){
            this.JobDoneCount.push(user.jobDoneCount);
          }
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: [users,this.JobDoneCount]
            });
        });
});
// change user password
router.patch('/changepassword/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {

    if (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
    }
    if (!user) {
        return res.status(401).json({
            title: 'Login failed',
            error: {message: 'Invalid login credentials'}
        });
    }
    user.password=bcrypt.hashSync(req.body.password, 10);
    user.save(function(err, result) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Password is Changed',
            obj: result
        });
    });
  });
});
router.post('/profile',upload.array("uploads[]", 12),function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
    var profile=JSON.parse(req.body.profile);
       User.findById(decoded.user._id,function(err, user){
         user.profile={
            userImage: req.files[0].filename,
             jobTitle: profile.jobTitle,
             educationLevel: profile.educationLevel,
             age: profile.age,
             experience: profile.experience,
             coverLetter: profile.coverLetter,
             phoneNumber: profile.phoneNumber,
             websitesLink: profile.websiteLink,
             facebookLink: profile.facebookLink,
             twitterLink: profile.twitterLink,
             googleLink: profile.googleLink,
             linkedinLink: profile.linkdinLink,
             country: profile.country,
             city: profile.city,
             address: profile.address,
             categories:profile.categories,
             workExperience:{
               title:profile.workTitle,
               from:profile.workFrom,
               to:profile.workTo,
               company:profile.workCompany,
               description:profile.workDescription
             },
             education:{
               title:profile.educationTitle,
               from:profile.educationFrom,
               to:profile.educationTo,
               institue:profile.educationInstitue,
               description:profile.educationDescription
             }
         };
         for(let language of profile.languages){
           user.profile.languages.push(language);
         }
         user.save(function(err, result) {
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
router.patch('/profile', upload.array("uploads[]", 12),function (req, res, next) {
  imageName='';
  var decoded = jwt.decode(req.query.token);
      var profile=JSON.parse(req.body.profile);
       User.findById(decoded.user._id,function(err, user){
         if(req.files[0]==undefined){
           this.imageName=user.profile.userImage;
         }
         else{
           this.imageName=req.files[0].filename;
               }
         user.profile={
             userImage:this.imageName,
             jobTitle: profile.jobTitle,
             educationLevel: profile.educationLevel,
             age: profile.age,
             experience: profile.experience,
             coverLetter: profile.coverLetter,
             phoneNumber: profile.phoneNumber,
             websitesLink: profile.websiteLink,
             facebookLink: profile.facebookLink,
             twitterLink: profile.twitterLink,
             googleLink: profile.googleLink,
             linkedinLink: profile.linkdinLink,
             country: profile.country,
             city: profile.city,
             address: profile.address,
             categories:profile.categories,
             workExperience:{
               title:profile.workTitle,
               from:profile.workFrom,
               to:profile.workTo,
               company:profile.workCompany,
               description:profile.workDescription
             },
             education:{
               title:profile.educationTitle,
               from:profile.educationFrom,
               to:profile.educationTo,
               institue:profile.educationInstitue,
               description:profile.educationDescription
             }
         };
         for(let language of profile.languages){
           user.profile.languages.push(language);
         }
         user.save(function(err, result) {
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
       User.findById(req.params.id)
       .populate('user','name')
       .exec(function (err, user) {
         if (err) {
             return res.status(500).json({
                 title: 'An error occurred',
                 error: err
             });
         }
         res.status(201).json({
             message: 'We Got Profile Successfully',
             obj: user
         });
});
});
module.exports = router;
