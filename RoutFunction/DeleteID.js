const dbConnection = require('../Config/Db');
const fs = require('fs');
const path = require('path');

async function DeleteID(req, res){
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];

    const [tokenDB] = await dbConnection.query('SELECT * FROM tokendb WHERE token = ?',[token]);
    if(tokenDB.length >0){
        const [tokenMail] = await dbConnection.query('SELECT user_email FROM tokendb WHERE token = ?',[token]);
        const [userdata] = await dbConnection.query('SELECT slno, imglink FROM users WHERE email = ?',[tokenMail[0].user_email]);

        const [userDelete] = await dbConnection.query('DELETE FROM users WHERE email = ?',[tokenMail[0].user_email]);
        if(userDelete){
            const url = userdata[0].imglink;
            const parts = url.split('/'); 
            const filename = parts[parts.length - 1];

            const imagePath = path.join('public/images', filename);
            fs.unlinkSync(imagePath);
            await dbConnection.query('DELETE FROM posts WHERE user_slno = ?',[userdata[0].slno]);
            await dbConnection.query('DELETE FROM tokendb WHERE token = ?',[token]);

            return res.status(200).json({
                message : 'Account Deleted'
            })
        }else{
            return res.status(200).json({
                message : 'Deletion Failed Try Later.'
            })
        }
    }
}

module.exports = DeleteID;