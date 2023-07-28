const dbConnection = require('../Config/Db');
const Joi = require('joi');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const   PassSchema = Joi.object({
    mail: Joi.string().email().required(),
  });
  
  function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPassword = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomPassword += charset[randomIndex];
    }
  
    return randomPassword;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Set to true if you're using port 465 with SSL/TLS
    auth: {
      user: '',
      pass: '',
    },
  });

  
async function SendMail(req, res){
    const {error} = PassSchema.validate(req.body);
    if(error){
        return res.status(200).json({
            message : 'Validation failed'
        })
    }

    var mail = req.body.mail;
    var [mailExist] = await dbConnection.query('SELECT * FROM users WHERE email = ?',[mail]);
    if(mailExist.length>0){
        const new_pass = generateRandomPassword(15);
        const mailOptions = {
            from: 'your-gmail-username@gmail.com', // Sender address (must be your Gmail address)
            to: `${mail}`,           // Recipient address
            subject: 'Forgot Password',            // Subject of the email
            text: `Your new password is: ${new_pass}. After login please change it immidiately.`, // Email body in plain text
            // html: '<p>Your HTML message goes here (if you want to send an HTML email)</p>'
          };
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return res.status(200).json({
                    message : 'Some Error Occured.'
                })
            } else {
                var [mailExist] = await dbConnection.query('SELECT * FROM otp_smtp WHERE email = ?',[mail]);
                if(mailExist.length>0){
                    await dbConnection.query('DELETE FROM otp_smtp WHERE email = ?',[mail]);   
                }
                
                const saltRounds = 10;
                var hashPass = await bcrypt.hash(new_pass, saltRounds);
                await dbConnection.query('INSERT INTO otp_smtp (email, otp) VALUES (?, ?)',[mail, hashPass]);

                return res.status(200).json({
                    message : 'Successful!!! Check Your Mail For New Password. After Login With That You Can Change Password As You Want !'
                })
            }
          });
    }else{
        return res.status(200).json({
            message : 'Mail Do Not Exist In Database !!!'
        })
    }
}

module.exports = SendMail;