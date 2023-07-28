const dbConnection = require('../Config/Db')

async function AdminDelComs(req, res){
    var {usersl, postno, comno} = req.params;
    var [postExist] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?',[postno]);
    if(postExist.length>0){
        var [ownPost] = await dbConnection.query('SELECT * FROM posts WHERE slno = ? AND user_slno = ?',[postno, usersl]);
        if(ownPost.length>0){
            var [comExist] = await dbConnection.query('SELECT * FROM comments WHERE slno = ?',[comno]);
            if(comExist.length>0){
                var [allMatch] = await dbConnection.query('SELECT * FROM comments WHERE slno = ? AND post_slno = ?',[comno, postno]);
                if(allMatch.length>0){
                    var [delSuccess] = await dbConnection.query('DELETE FROM comments WHERE slno = ? AND post_slno = ?',[comno, postno]);
                    if(delSuccess){
                        return res.status(200).json({
                            message : 'Comment Deleted.'
                        })
                    }else{
                        return res.status(200).json({
                            message : 'Not your comment.'
                        })
                    }
                }
            }
        }
    }
}

module.exports = AdminDelComs;