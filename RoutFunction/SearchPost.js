const dbConnection = require('../Config/Db')

async function SearchPost(req, res){
    const {usersl, searchdata} = req.params;
    var [result] = await dbConnection.query(`SELECT * FROM posts WHERE user_post LIKE '%${searchdata}%' OR intro LIKE '%${searchdata}%' ORDER BY slno DESC`);
    if(result.length == 1){
        var [results] = await dbConnection.query(`SELECT * FROM posts WHERE user_post LIKE '%${searchdata}%' OR intro LIKE '%${searchdata}%' ORDER BY slno DESC`);
        const [mailval] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?',[results[0].user_slno]);
        results.author_email = mailval[0].email;
        results.image =  mailval[0].imglink;

        return res.status(200).json({
            message : 'Successful',
            searchResult : results
        })

    }else if(result.length>1){
        await Promise.all(result.map(async (post)=>{
            const [mailuser] = await dbConnection.query('SELECT email, imglink FROM users WHERE slno = ?',[post.user_slno]);
            post.author_email = mailuser[0].email;
            post.image = mailuser[0].imglink;
        }))

        return res.status(200).json({
            message : 'Successful',
            searchResult : result
        })
    }
}

module.exports = SearchPost;