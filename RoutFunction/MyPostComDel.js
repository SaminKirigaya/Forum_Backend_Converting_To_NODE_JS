const dbConnection = require('../Config/Db');

async function MyPostComDel(req, res){
    var {usersl, comntno} = req.params;
    var [comExist] = await dbConnection.query('SELECT * FROM comments WHERE slno = ?',[comntno]);
    if(comExist.length>0){
        var [userno] = await dbConnection.query('SELECT user_slno FROM posts WHERE slno = ?',[comExist[0].post_slno]);
        if(userno[0].user_slno == usersl){
            var [comSuccess] = await dbConnection.query('DELETE FROM comments WHERE slno = ?',[comntno]);
            if(comSuccess){
                return res.status(200).json({
                    message : 'Successful'
                })
            }else{
                return res.status(200).json({
                    message : 'Some Error Occured. Please Try Later.'
                })
            }
        }
    }

}

module.exports = MyPostComDel;