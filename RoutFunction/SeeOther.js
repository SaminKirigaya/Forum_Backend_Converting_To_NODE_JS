const dbConnection = require('../Config/Db')

async function SeeOther(req, res){
    var {usersl, mail} = req.params;
    var [userExist] = await dbConnection.query('SELECT * FROM users WHERE email = ?',[mail]);
    if(userExist.length>0){
        var [userData] = await dbConnection.query('SELECT email,imglink,country,age,gender,joined FROM users WHERE email = ?',[mail]);
        var [userSl] =await dbConnection.query('SELECT slno FROM users WHERE email = ?',[mail]);
        
        
        var [totalpost] = await dbConnection.query('SELECT * FROM posts WHERE user_slno = ? ORDER BY slno DESC',[userSl[0].slno]);
        
        return res.status(200).json({
            email : userData[0].email,
            imagelink : userData[0].imglink,
            country : userData[0].country,
            age : userData[0].age,
            gender : userData[0].gender,
            joined : userData[0].joined,
            mother_post : totalpost.length>0 ? totalpost : []
        })
    }
}

module.exports = SeeOther;