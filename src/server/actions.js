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
    server.send({
      text:    req.body.context,
      from:    "yu.stepanyuk.ra@gmail.com",
      to:      "yu.stepanyuk.ra@gmail.com",
      // req.body.user.email
      subject: "You have a new actyvity at your site"
    }, function(err, message) {
      if(err)
        console.log(err);
      else
        return res.json({success: true, msg: 'sent'});
    });
  }


}

module.exports = functions;
