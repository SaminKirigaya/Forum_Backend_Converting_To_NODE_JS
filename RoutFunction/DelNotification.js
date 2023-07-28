const dbConnection = require('../Config/Db');

async function DelNotification(req,res){

    var {usersl, highestsl} = req.params;
    highestsl = parseInt(highestsl);
    highestsl = highestsl+1;

    var [delSuccess] = await dbConnection.query('DELETE FROM notification WHERE owner_slno = ? AND slno < ?',[usersl, highestsl]);
    if(delSuccess){
        return res.status(200).json({
            message : 'Success'
        })
    }else{
        return res.status(200).json({
            message : 'Failed'
        })
    }
}


module.exports = DelNotification; 