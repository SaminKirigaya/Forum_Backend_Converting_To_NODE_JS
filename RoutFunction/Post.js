const dbConnection = require('../Config/Db')
const Joi = require('joi');


const schema = Joi.object({
    prob_type : Joi.required(),
    post : Joi.required(),
    prob_intro : Joi.required()
})

async function Post(req, res){
    const {usersl} = req.params;
    try{
        const { error, value } = schema.validate(req.body);
        if(error){
            return res.status(200).json({ errors: error.details[0].message});
        }

        const probType = req.body.prob_type;
        var post = req.body.post;
        var probName = req.body.prob_intro;
        
        const charactersToReplace = ['<', '>', '/', ';'];
        const replacementCharacters = ['&lt;', '&gt;', '&#47;', '&#59;'];
      
        for (let i = 0; i < charactersToReplace.length; i++) {
            const regex = new RegExp(charactersToReplace[i], 'g');
            post = post.replace(regex, replacementCharacters[i]);
            probName = probName.replace(regex, replacementCharacters[i]);
        }
        
        
        const usr_sl = parseInt(usersl);

        const [DBinsert] = await dbConnection.query('INSERT INTO posts (user_slno, user_post, viewed, total_comments, like_amount, dislike_amount, problem_type, intro) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[usr_sl, post, 0, 0, 0, 0, probType, probName]);
        if(DBinsert){
            return res.status(200).json({
                message : 'Successful'
            })
        }else{
            return res.status(200).json({
                message : 'Some Error Occured Try Later...'
            })
        }
    }catch(error){
        return res.status(200).json({
            message : 'Some Error Occured Try Later...'
        })
    }

}

module.exports = Post;