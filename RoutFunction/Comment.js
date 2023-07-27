const dbConnection = require('../Config/Db')
const Joi = require('joi');

const schema = Joi.object({
    comment : Joi.required()
    
})

async function Comment(req, res){
    var {usersl, postno} = req.params;
    var [postexist] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?',[postno]);
    if(postexist.length > 0){
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(200).json({ errors: error.details[0].message});
        }
        var coms = req.body.comment;
        const charactersToReplace = ['<', '>', '/', ';'];
        const replacementCharacters = ['&lt;', '&gt;', '&#47;', '&#59;'];
      
        for (let i = 0; i < charactersToReplace.length; i++) {
            const regex = new RegExp(charactersToReplace[i], 'g');
            var commentz = coms.replace(regex, replacementCharacters[i]);
            
        }

        var [comsSubmit] = await dbConnection.query('INSERT INTO comments (post_slno, comment_user_slno, comment, like_amount, dislike_amount) VALUES (?, ?, ?, ?, ?)',[postno, usersl, commentz, 0, 0]);
        if(comsSubmit){
            var [author] = await dbConnection.query('SELECT user_slno FROM posts WHERE slno = ?',[postno]);
            var [commenter] = await dbConnection.query('SELECT email FROM users WHERE slno = ?',[usersl]);
            if(author[0].user_slno != usersl){
                await dbConnection.query('INSERT INTO notification (owner_slno, commenter_slno, commenter_email, reason, post_slno) VALUES (?, ?, ?, ?, ?)',[author[0].user_slno, usersl, commenter[0].email, 'Commented In Your Post.', postno]);

            }

            var [comnt] = await dbConnection.query('SELECT total_comments FROM posts WHERE slno = ?',[postno]);
            comnt[0].total_comments = comnt[0].total_comments + 1 ;
            await dbConnection.query('UPDATE posts SET total_comments = ? WHERE slno = ?',[comnt[0].total_comments, postno]);

            var [posts] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?',[postno]);
            var [user] = await dbConnection.query('SELECT email,imglink FROM users WHERE slno = ?',[posts[0].user_slno]);
            if(user){
                posts[0].author = user[0].email;
                posts[0].image  = user[0].imglink;
            }

            var [comment] = await dbConnection.query('SELECT * FROM comments WHERE post_slno = ?',[postno]);
            if(comment.length == 1){
                [comment] = await dbConnection.query('SELECT * FROM comments WHERE post_slno = ?',[postno]);
                var [users] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?',[comment[0].comment_user_slno]);
                comment[0].author = users[0].email;
                comment[0].image = users[0].imglink;
            }else if(comment.length > 1){
                [comment] = await dbConnection.query('SELECT * FROM comments WHERE post_slno = ? ORDER BY slno DESC',[postno]);
                await Promise.all( comment.map(async(coms)=>{
                    var [user] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?',[coms.comment_user_slno]);
                    coms.author = user[0].email;
                    coms.image = user[0].imglink;
                }))
            }

            return res.status(200).json({
                message : 'Comment Successful',
                update_post : posts,
                comments : comment
            })
        }
    }
}

module.exports = Comment;