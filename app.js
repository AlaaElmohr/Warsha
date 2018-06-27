var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var messageRoutes = require('./routes/messages');
var userRoutes = require('./routes/user');
var authRoutes = require('./routes/auth');
var clientRoutes = require('./routes/client');
var jobRoutes = require('./routes/job');
var applicationRoutes = require('./routes/application');
var postRoutes = require('./routes/post');
var commentRoutes = require('./routes/comment');
var feedbackRoutes = require('./routes/feedback');
var contractRoutes = require('./routes/contract');
var sendEmailRoutes = require('./routes/sendEmail');
var app = express();
//mongoose.connect('mongodb://localhost:27017/Graduation-Project');

mongoose.connect('mongodb://test-user:alaa1234@ds263740.mlab.com:63740/warsha');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('assets'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/message', messageRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);
app.use('/auth', authRoutes);
app.use('/client', clientRoutes);
app.use('/job', jobRoutes);
app.use('/application', applicationRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/contract', contractRoutes);
app.use('/sendEmail', sendEmailRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
