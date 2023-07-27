const dbConnection = require('../Config/Db')

async function Solve(req, res){
    const {usersl, probsl} = req.params;
    var [postExist] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?',[probsl]);
    if(postExist.length > 0){
        var [userData] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?',[postExist[0].user_slno]);
        if(userData){
            postExist[0].author = userData[0].email;
            postExist[0].image = userData[0].imglink;
        }

        var [comment] = await dbConnection.query('SELECT * FROM comments WHERE post_slno = ?',[probsl]);
        if(comment.length == 1){
            [comment] = await dbConnection.query('SELECT * FROM comments WHERE post_slno = ?',[probsl]);
            var [users] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?',[comment[0].comment_user_slno]);
            comment[0].author = users[0].email;
            comment[0].image = users[0].imglink;
        }else if(comment.length > 1){
            [comment] = await dbConnection.query('SELECT * FROM comments WHERE post_slno = ? ORDER BY slno DESC',[probsl]);
            await Promise.all( comment.map(async(coms)=>{
                var [user] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?',[coms.comment_user_slno]);
                coms.author = user[0].email;
                coms.image = user[0].imglink;
            }))
        }else{
            comment = []
        }

        return res.status(200).json({
            message : 'Successful',
            postDetail :  postExist,
            //add comment if exist
            comments :  comment
        })
    }
}

module.exports = Solve;