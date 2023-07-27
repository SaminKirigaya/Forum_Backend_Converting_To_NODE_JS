const dbConnection = require('../Config/Db');

async function PostTypes(req, res){
    const [posttype] = await dbConnection.query('SELECT * FROM problem_types');
    return res.status(200).json({
        postType : posttype
    });
}

module.exports = PostTypes;