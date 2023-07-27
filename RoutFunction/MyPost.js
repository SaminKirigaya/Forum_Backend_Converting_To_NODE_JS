const dbConnection = require('../Config/Db');

async function MyPost(req, res){
    const {usersl} = req.params;
    var [my_post] = await dbConnection.query('SELECT * FROM posts WHERE user_slno = ? ORDER BY slno DESC',[usersl]);

    await Promise.all(my_post.map(async(post)=>{
        const [user_mail] = await dbConnection.query('SELECT email FROM users WHERE slno = ?',[usersl]);
        post.email = user_mail[0].email;
    }))

    return res.status(200).json({
        message : 'Successful',
        profilePost : my_post
    })

}   

module.exports = MyPost;