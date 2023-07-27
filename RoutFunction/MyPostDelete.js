const dbConnection = require('../Config/Db');

async function MyPostDelete(req,res){
    var {usersl, postno} = req.params;
    var [postexist] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?',[postno]);
    if(postexist.length > 0){
        usersl = parseInt(usersl);
        var [postAuthor] = await dbConnection.query('SELECT user_slno FROM posts WHERE slno = ?',[postno]);
        if(postAuthor[0].user_slno == usersl){
        
            var [delPost] = await dbConnection.query('DELETE FROM posts WHERE slno = ?',[postno]);
            if(delPost){
                await dbConnection.query('DELETE FROM comments WHERE post_slno = ?',[postno]);
                var [my_post] = await dbConnection.query('SELECT * FROM posts WHERE user_slno = ? ORDER BY slno DESC',[usersl]);

                await Promise.all(my_post.map(async(post)=>{
                    const [user_mail] = await dbConnection.query('SELECT email FROM users WHERE slno = ?',[usersl]);
                    post.email = user_mail[0].email;
                }))

                return res.status(200).json({
                    message : 'Post Deleted Successfully.',
                    updatedpost : my_post
                })
            }

        
    }
    }
}
module.exports = MyPostDelete;