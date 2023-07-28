const dbConnection = require('../Config/Db');

async function Notification(req, res){
    var {usersl} = req.params;
    var [notiExist] = await dbConnection.query('SELECT * FROM notification WHERE owner_slno = ?',[usersl]);
    if(notiExist.length>0){
        if(notiExist.length == 1){
            return res.status(200).json({
                message : 'One New Notification.',
                notification : notiExist
            })
        }else if(notiExist.length > 1){
            var [allNoti] = await dbConnection.query('SELECT * FROM notification WHERE owner_slno = ? ORDER BY slno DESC',[usersl]);
            return res.status(200).json({
                message : 'Too Many New Notification.',
                notification : allNoti
            })
        }


    }else{
        return res.status(200).json({
            message : 'No New Notification To Show.'
        })
    }

}

module.exports = Notification;