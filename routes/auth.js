var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
// SignUp
router.post('/signup', function (req, res, next) {
    var user = new User({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save(function(err, result) {
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
});

// SignInddddd
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
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfull logged in',
            user:user.name,
            token: token,
            userId: user._id
        });
    });
});
module.exports = router;
