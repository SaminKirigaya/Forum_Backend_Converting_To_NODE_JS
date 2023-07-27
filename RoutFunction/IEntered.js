const { watch } = require('fs');
const dbConnection = require('../Config/Db');
const { post } = require('../routes/route');

async function IEntered(req, res){
    const {usersl, postno} = req.params;
    const [postexist] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?',[postno]);
    if(postexist.length > 0){
        const [postuser] = await dbConnection.query('SELECT user_slno FROM posts WHERE slno = ?',[postno]);
        if(usersl == postuser[0].user_slno){
            return res.status(200).json({
                message : 'Own Post'
            })
        }else{
            var [lastView] = await dbConnection.query('SELECT viewed FROM posts WHERE slno = ?',[postno]);
            lastView[0].viewed = lastView[0].viewed+1;

            await dbConnection.query('UPDATE posts SET viewed = ? WHERE slno = ?',[lastView[0].viewed, postno])
        }
    }
}
module.exports= IEntered;