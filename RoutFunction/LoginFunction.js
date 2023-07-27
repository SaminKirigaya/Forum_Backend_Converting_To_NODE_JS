const dotenv = require('dotenv');

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const dbConnection = require('../Config/Db')

dotenv.config();
// Your database configuration


const schema = Joi.object({
    
  email: Joi.string().email().required(),
  password: Joi.required(),
});

// Create a pool to manage database connections


const loginHandler = async (req, res) => {
  
  
  const { error, value } = schema.validate(req.body);

  if (error) {
    // If there are validation errors, send a response with the error details
    return res.status(400).json({ error: error.details[0].message });
  }
  
  const mail = req.body.email;
  const pass = req.body.password;

  try {
    
    
    const [tokenz] = await dbConnection.query('SELECT * FROM tokendb WHERE user_email = ?', [mail,]);
    if (tokenz && tokenz.length > 0) {
      await dbConnection.query('DELETE FROM tokendb WHERE user_email = ?', [mail,]);
    }

    const [mail_exist] = await dbConnection.query('SELECT * FROM users WHERE email = ?', [mail,]);
    if (mail_exist.length > 0) {
      const [otp_pass] = await dbConnection.query('SELECT otp FROM otp_smtp WHERE email = ?', [mail,]);
      const [Db_pass] = await dbConnection.query('SELECT pass FROM users WHERE email = ?', [mail,]);

      const dbMatch = await bcrypt.compare(pass, Db_pass[0].pass);
      const otpMatch = await bcrypt.compare(pass, otp_pass[0].otp);

      if (dbMatch) {
        const token = uuidv4();
        await dbConnection.query('INSERT INTO tokendb (user_email, token) VALUES (?, ?)', [mail, token]);
        const [userdet] = await dbConnection.query('SELECT * FROM users WHERE email = ?', [mail,]);
        const user = userdet.length ? userdet[0] : null;

        

        return res.status(200).json({
          message: 'Login Successful',
          usersl: user.slno,
          useremail: user.email,
          token: token,
          image: user.imglink,
        });
      } else if (otpMatch) {
        const token = uuidv4();
        await dbConnection.query('INSERT INTO tokendb (user_email, token) VALUES (?, ?)', [mail, token]);
        const [userdet] = await dbConnection.query('SELECT * FROM users WHERE email = ?', [mail]);
        const user = userdet.length ? userdet[0] : null;

        

        return res.status(200).json({
          message: 'Login Successful',
          usersl: user.slno,
          useremail: user.email,
          token: token,
          image: user.imglink,
        });
      } else {
        

        return res.status(200).json({
          message: 'Sorry Password Does Not Match ... Make Sure To Insert Valid Password',
        });
      }
    } else {
      

      return res.status(200).json({
        message: 'Sorry Email Does Not Exist ... Make Sure To Insert Valid User Email.',
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = loginHandler;