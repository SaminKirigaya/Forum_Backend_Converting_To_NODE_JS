const dbConnection = require('../Config/Db')

async function HomePost(req, res){
    var [randomPost] = await dbConnection.query('SELECT * FROM posts ORDER BY RAND()');
    await Promise.all(randomPost.map(async (post) => {
        const [user] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?', [post.user_slno]);
        post.author_email = user.length ? user[0].email : 'Unknown';
        post.author_image = user.length ? user[0].imglink : 'Unknown';
      }));

    var [topPost] = await dbConnection.query('SELECT * FROM posts ORDER BY slno DESC');
    await Promise.all(topPost.map(async (postTop)=>{
        const [user] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?',[postTop.user_slno]);
        postTop.author_email = user.length ? user[0].email : 'Unknown';
        postTop.author_image = user.length ? user[0].imglink : 'Unknown';
    }));

    return res.status(200).json({
        randomposts : randomPost,
        toppost : topPost
    });
}

module.exports = HomePost;