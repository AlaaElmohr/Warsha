var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
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
  let transporter = nodeMailer.createTransport({
    service: 'gmail',
   host: 'smtp.gmail.com',
      secure: true,
      auth: {
          user: req.body.from,
          pass:req.body.password
      }
  });
  let mailOptions = {
      from: req.body.from, // sender address
      to: req.body.to, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      });
});

module.exports = router;
