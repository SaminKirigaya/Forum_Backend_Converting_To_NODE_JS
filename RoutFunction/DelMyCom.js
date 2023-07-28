const dbConnection = require('../Config/Db')

async function DelMyCom(req, res){
    var {usersl , comno} = req.params;
    var [comExist] = await dbConnection.query('SELECT * FROM comments WHERE slno = ?',[comno]);
    if(comExist.length>0){
        var [owncom] = await dbConnection.query('SELECT * FROM comments WHERE slno = ? AND comment_user_slno = ?',[comno, usersl]);
        if(owncom.length>0){
            var [successDel] = await dbConnection.query('DELETE FROM comments WHERE slno = ? AND comment_user_slno = ?',[comno, usersl]);
            if(successDel){
                return res.status(200).json({
                    message : 'Successfully Deleted.'
                })
            }else{
                return res.status(200).json({
                    message : 'Not Your Comment.'
                })
            }
        }
    }
}

module.exports = DelMyCom;