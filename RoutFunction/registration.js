const dbConnection = require('../Config/Db');
const upload = require('../Config/Multer');
const path = require('path');
const jimp = require('jimp');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const Joi = require('joi');

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  pass: Joi.string().pattern(/^([a-zA-Z0-9*!@]+){6,50}$/).required(),
  cpass: Joi.string().valid(Joi.ref('pass')).required(),
  countrys: Joi.string().pattern(/^([a-zA-Z]+)$/).required(),
  ages: Joi.number().integer().min(7).max(90).required(),
  genders: Joi.string().pattern(/^([a-zA-Z]+)$/).required(),
});



async function registrationHandle (req, res) {
    try {
      const { error, value } = registrationSchema.validate(req.body);

      if(error){
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(200).json({ errors: error.details[0].message});
      }
        
     

      const mail = req.body.email;
      const pass = req.body.pass;
      const countryz = req.body.countrys;
      const agez = req.body.ages;
      const genderz = req.body.genders;

      // Check if an image file was uploaded
      if (!req.file) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(200).json({ error: 'Image file is required!' });
      }

      const imageFile = req.file;
      // Validate image file type and size
      const allowedFiletypes = /jpeg|jpg/;
      const mimetype = allowedFiletypes.test(imageFile.mimetype);
      const extname = allowedFiletypes.test(path.extname(imageFile.originalname).toLowerCase());
      if (!mimetype || !extname) {
        fs.unlinkSync(imageFile.path);
        return res.status(400).json({ error: 'Images only (JPEG/JPG) allowed!' });
      }

      // Validate image file size
      const maxFileSize = 1024 * 1024; // 1 MB max file size
      if (imageFile.size > maxFileSize) {
        fs.unlinkSync(imageFile.path);
        return res.status(400).json({ error: 'Image size exceeds the limit (1 MB)!' });
      }



      // Your code to generate hash pass and save to the database
      const saltRounds = 10;
      const pass2 = await bcrypt.hash(pass, saltRounds);

      // Check if the email already exists in the database
      const emailExists = await dbConnection.query('SELECT COUNT(*) AS count FROM users WHERE email = ?', [
        mail,
      ]);
      if (emailExists[0][0].count > 0) {
        fs.unlinkSync(imageFile.path);
        return res.status(200).json({ message: 'Sorry Email Already Exist ... You Can Not Use Same Email Twice.' });
      }

      
      // Validate image file type and size (your existing validation code)

      // If all validations passed, proceed with registration
      const imageUrl = path.join('public/images', imageFile.filename);
      

      // Resize the uploaded image using jimp
      const image = await jimp.read(imageFile.path);
      await image.resize(100, 100).quality(50).writeAsync(imageUrl);
      
      

      const globalimage = `${process.env.Imgpath}/public/images/${imageFile.filename}`
      // MySQL database query to insert user data
      const insertUserQuery =
        'INSERT INTO users (email, pass, country, age, gender, imglink) VALUES (?, ?, ?, ?, ?, ?)';
      await dbConnection.query(insertUserQuery, [mail, pass2, countryz, agez, genderz, globalimage]);

      // Set initial recover pass
      const insertOTPQuery = 'INSERT INTO otp_smtp (email, otp) VALUES (?, ?)';
      await dbConnection.query(insertOTPQuery, [mail, pass2]);

      // Successful registration
      return res.status(200).json({
        message: 'Registration Successful Please Login With Your Credential For First Time.',
      });
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  module.exports = registrationHandle;