const dbConnection = require('../Config/Db')
const Joi = require('joi');

const schema = Joi.object({
    postType : Joi.required(),
    mainPost : Joi.required(),
    introduction : Joi.required()
})

async function PostEditSub(req, res){
    var {usersl, postno} = req.params;
    var [postexist] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?',[postno]);
    if(postexist.length > 0){
        usersl = parseInt(usersl);
        var [postAuthor] = await dbConnection.query('SELECT user_slno FROM posts WHERE slno = ?',[postno]);
        if(postAuthor[0].user_slno == usersl){
            const {error} = schema.validate(req.body);
            if(error){
                return res.status(200).json({ errors: error.details[0].message});
            }
            const probType = req.body.postType;
            var post = req.body.mainPost;
            var probName = req.body.introduction;

            const charactersToReplace = ['<', '>', '/', ';'];
            const replacementCharacters = ['&lt;', '&gt;', '&#47;', '&#59;'];
      
            for (let i = 0; i < charactersToReplace.length; i++) {
                const regex = new RegExp(charactersToReplace[i], 'g');
                post = post.replace(regex, replacementCharacters[i]);
                probName = probName.replace(regex, replacementCharacters[i]);
            }
          

            var [updatePost] = await dbConnection.query('UPDATE posts SET intro = ?, problem_type = ?, user_post = ? Where slno = ?',[probName, post, probType, postno]);
            if(updatePost){
                return res.status(200).json({
                    message : 'Post Update Successful.'
                })
            }else{
                return res.status(200).json({
                    message : 'Post Update Failed. Please try Later.'
                })
            }
    }
    }
}

module.exports = PostEditSub;