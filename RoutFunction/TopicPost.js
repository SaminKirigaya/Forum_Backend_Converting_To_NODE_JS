const dbConnection = require('../Config/Db')

async function TopicPost (req, res){
    const {codename} = req.params;
    var [topic] = await dbConnection.query('SELECT * FROM posts WHERE problem_type = ? ORDER BY slno DESC',[codename]);
    if(topic.length == 1){
        var [topics] = await dbConnection.query('SELECT * FROM posts WHERE problem_type = ? ORDER BY slno DESC',[codename]);
        const [user] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?',[topics[0].user_slno]);
        topics[0].author_email = user[0].email;
        topics[0].image = user[0].imglink;

        return res.status(200).json({
            message : 'Successful',
            topic_post : topics
        })
    }else if(topic.length > 1){
       await Promise.all( topic.map(async(post)=>{
            const [users] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?',[post.user_slno]);
            post.author_email = users[0].email;
            post.image = users[0].imglink;
        
        }) );

        return res.status(200).json({
            message : 'Successful',
            topic_post : topic
        })

    }
}

module.exports = TopicPost;