const dbConnection = require('../Config/Db');
const Joi = require('joi');

const schema = Joi.object({
    prob_type : Joi.required(),
    post : Joi.required(),
    prob_intro : Joi.required()
})

async function MyPostEdit(req, res){
    var {usersl, postno} = req.params;
    var [postexist] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?',[postno]);
    if(postexist.length > 0){
        usersl = parseInt(usersl);
        var [postAuthor] = await dbConnection.query('SELECT user_slno FROM posts WHERE slno = ?',[postno]);
        if(postAuthor[0].user_slno == usersl){
        var [editPostData] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?',[postno]);

        return res.status(200).json({
            message : 'Successful',
            editPost : editPostData
        })
    }
    }
    
}

module.exports = MyPostEdit;