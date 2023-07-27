const dbConnection = require('../Config/Db')
const Joi = require('joi');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');

const registrationSchema = Joi.object({
    email: Joi.string().email().required(),
    countrys: Joi.string().pattern(/^([a-zA-Z]+)$/).required(),
    ages: Joi.number().integer().min(7).max(90).required(),
    genders: Joi.string().pattern(/^([a-zA-Z]+)$/).required(),
});

async function ChangeProfileSub(req, res){
    const {usersl} = req.params;
    try{
        const {error} = registrationSchema.validate(req.body);
        if(error){
            if (req.file) {
            fs.unlinkSync(req.file.path);
            }
            return res.status(200).json({ errors: error.details[0].message});
        }
        if(req.file){
            const imageFile = req.file;
            // Validate image file type and size
            const allowedFiletypes = /jpeg|jpg/;
            const mimetype = allowedFiletypes.test(imageFile.mimetype);
            const extname = allowedFiletypes.test(path.extname(imageFile.originalname).toLowerCase());
            if (!mimetype || !extname) {
                fs.unlinkSync(imageFile.path);
                return res.status(500).json({ error: 'Images only (JPEG/JPG) allowed!' });
            }

            // Validate image file size
            const maxFileSize = 1024 * 1024; // 1 MB max file size
            if (imageFile.size > maxFileSize) {
                fs.unlinkSync(imageFile.path);
                return res.status(500).json({ error: 'Image size exceeds the limit (1 MB)!' });
            }
        }

        const mail = req.body.email;
        const countryz = req.body.countrys;
        const agez = req.body.ages;
        const genderz = req.body.genders;

        const [newMailExist] = await dbConnection.query('SELECT * FROM users WHERE email = ?',[mail]);
        if(newMailExist.length > 0){
            //mail exist so check if this is current users old mail with users slno
            const [acc_slno] = await dbConnection.query('SELECT slno FROM users WHERE email = ?',[mail]);
            if(acc_slno[0].slno == usersl){
                if(req.file){

                    const imageFile = req.file;
                    const imageUrl = path.join('public/images', imageFile.filename);
      

                    // Resize the uploaded image using jimp
                    const image = await jimp.read(imageFile.path);
                    await image.resize(100, 100).quality(50).writeAsync(imageUrl);

                    const globalimage = `${process.env.Imgpath}/public/images/${imageFile.filename}`
                    const [real_mail] = await dbConnection.query('SELECT email FROM users WHERE slno = ?',[usersl]);
                    await dbConnection.query('DELETE FROM tokendb WHERE user_email = ?',[real_mail[0].email]);

                    const [success] = await dbConnection.query('UPDATE users SET email = ?, country = ?, age = ?, gender = ?, imglink = ? WHERE slno = ?',[mail, countryz, agez, genderz, globalimage, usersl])
                    if(success){
                        return res.status(200).json({
                            message : 'Successful'
                        });
                    }
                }else{
                    const [real_mail] = await dbConnection.query('SELECT email FROM users WHERE slno = ?',[usersl]);
                    await dbConnection.query('DELETE FROM tokendb WHERE user_email = ?',[real_mail[0].email]);
                    const [success] = await dbConnection.query('UPDATE users SET email = ?, country = ?, age = ?, gender = ? WHERE slno = ?',[mail, countryz, agez, genderz, usersl])
                    if(success){
                        return res.status(200).json({
                            message : 'Successful'
                        });
                    }
                
                }
            }else{
                return res.status(200).json({
                    message : 'Sorry Email Already Exist ... You Can Not Use Same Email Twice.'
                })
            }
        }else{

            if(req.file){

                const imageFile = req.file;
                const imageUrl = path.join('public/images', imageFile.filename);
  

                // Resize the uploaded image using jimp
                const image = await jimp.read(imageFile.path);
                await image.resize(100, 100).quality(50).writeAsync(imageUrl);

                const globalimage = `${process.env.Imgpath}/public/images/${imageFile.filename}`
                const [real_mail] = await dbConnection.query('SELECT email FROM users WHERE slno = ?',[usersl]);
                await dbConnection.query('DELETE FROM tokendb WHERE user_email = ?',[real_mail[0].email]);

                const [success] = await dbConnection.query('UPDATE users SET email = ?, country = ?, age = ?, gender = ?, imglink = ? WHERE slno = ?',[mail, countryz, agez, genderz, globalimage, usersl])
                if(success){
                    return res.status(200).json({
                        message : 'Successful'
                    });
                }
            }else{
                const [real_mail] = await dbConnection.query('SELECT email FROM users WHERE slno = ?',[usersl]);
                await dbConnection.query('DELETE FROM tokendb WHERE user_email = ?',[real_mail[0].email]);
                const [success] = await dbConnection.query('UPDATE users SET email = ?, country = ?, age = ?, gender = ? WHERE slno = ?',[mail, countryz, agez, genderz, usersl])
                if(success){
                    return res.status(200).json({
                        message : 'Successful'
                    });
                }
            
            }
        }

    }catch(error){
        return res.status(500).json({
            message : 'Some Data Error.'
        })
    }
}

module.exports = ChangeProfileSub;