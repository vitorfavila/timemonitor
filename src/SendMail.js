var nodemailer = require('nodemailer');

class SendMail
{
    constructor() {
        var smtpConfig = {
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'sistema@timetech.com.br',
                pass: '43j3423rfs'
            }
        };

        this.transporter = nodemailer.createTransport(smtpConfig);
    }

    send(hostname, body)
    {
        this.mailOptions = {
            from: '"Servidor Monitorado" <sistema@timetech.com.br>', // sender address
            to: 'vitorfavila@gmail.com', // list of receivers
            subject: 'Server Alert - ' + hostname, // Subject line
            text: 'Server Alert - ' + hostname, // plaintext body
            html: body // html body
        };
        this.transporter.sendMail(this.mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
}

module.exports = SendMail;
