const dbConnection = require('../Config/Db');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const registrationSchema = Joi.object({
    pass: Joi.string().pattern(/^([a-zA-Z0-9*!@]+){6,50}$/).required(),
    cpass: Joi.string().valid(Joi.ref('pass')).required(),
  });
  

async function ChangePass(req, res){
    const {usersl} = req.params;
    try{
        const { error, value } = registrationSchema.validate(req.body);
        if(error){
            return res.status(200).json({
                message : 'Sorry Make Sure Both Pass And Condfirm Password Are Valid And Same.'
            })
        }

        const pass = req.body.pass;
        const saltRounds = 10;
        const pass2 = await bcrypt.hash(pass, saltRounds);

        const [updateDB] = await dbConnection.query('UPDATE users SET pass = ? WHERE slno = ?',[pass2, usersl]);
        if (updateDB){
            const [realMail] = await dbConnection.query('SELECT email FROM users WHERE slno = ?',[usersl]);
            await dbConnection.query('DELETE FROM tokendb WHERE user_email = ?',[realMail[0].email]);
            
            return res.status(200).json({
                message : 'Successful Please Login Again.'
            })
        }

    }catch(error){
        return res.status(500).json({
            message : 'Some Error Occured.'
        })
    }
}

module.exports = ChangePass;