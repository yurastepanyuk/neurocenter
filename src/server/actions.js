const email   = require('emailjs/email');

var functions = {

  getinfo: function(req, res){

    return res.json({success:true, msg: 'Example fuction'});

  },
  sendMail: function(req, res) {

    var server  = email.server.connect({
      user:    process.env.MAIL_LOGIN,
      password:process.env.MAIL_PASS,
      host:    "smtp.gmail.com",
      ssl:     true
    });

// send the message and get a callback with an error or details of the message that was sent
    var text = '';
    var subject = 'You have a new actyvity at your site';
    var header = '';
    var user = {};
    // req.query
    if (req.body.context) {
      text = req.body.context;
    } else if (req.query.context) {
      text = req.query.context;
    }

    if (req.body.organization) {
      subject = req.body.organization;
    }

    if (req.body.header) {
      header = req.body.header;
    }

    if (req.body.user) {
      user = req.body.user;
    }

    server.send({
      text:    header + '\n' + JSON.stringify(user)  +  '\n' + text,
      from:    "yu.stepanyuk.ra@gmail.com",
      to:      "yu.stepanyuk.ra@gmail.com",
      subject: subject
    }, function(err, message) {
      if(err)
        console.log(err);
      else
        return res.json({success: true, msg: 'sent'});
    });
  }


}

module.exports = functions;
