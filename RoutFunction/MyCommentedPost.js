const dbConnection = require('../Config/Db')


async function MyCommentedPost(req,res){
    var {usersl} = req.params;
    var [allMyComments] = await dbConnection.query('SELECT * FROM comments Where comment_user_slno = ? ORDER BY slno DESC',[usersl]);
    if(allMyComments){
        if(allMyComments.length == 1){
            var [allmotherPosts] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?',[allMyComments[0].post_slno]);
            var [author] = await dbConnection.query('SELECT email,imglink FROM users WHERE slno = ?',[allmotherPosts[0].user_slno]);
            allmotherPosts[0].author = author[0].email;
            allmotherPosts[0].image = author[0].image;

            return res.status(200).json({
                message : 'Successful.',
                mother_post : allmotherPosts
            })
        }else if(allMyComments.length > 1){
                
            var allmotherPosts = await Promise.all(
                allMyComments.map(async (percom) => {
                    var [allPosts] = await dbConnection.query('SELECT * FROM posts WHERE slno = ? ORDER BY slno DESC', [percom.post_slno]);
                    return allPosts;
                })
            );
        
            await Promise.all(
                allmotherPosts.map(async (perpost) => {
                    var [author] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?', [perpost[0].user_slno]);
        
                    if (author && author.length > 0) {
                        perpost[0].author = author[0].email;
                        perpost[0].image = author[0].imglink;
                    } else {
                        // Handle the case when author data is not found.
                        perpost[0].author = 'Unknown@'; // Or set a default value.
                        perpost[0].image = ''; // Or set a default value for the image.
                    }
                })
            );
        
            return res.status(200).json({
                message: 'Successful.',
                mother_post: allmotherPosts
            });
        }
    }else{
        return res.status(200).json({
            message : 'No Comment Yet'
        })
    }
}

module.exports = MyCommentedPost;