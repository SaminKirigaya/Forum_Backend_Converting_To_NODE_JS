
const dbConnection = require('../Config/Db')


async function AmILogged(req, res){
    const {token} = req.params;
    const [checkLog] = await dbConnection.query('SELECT * FROM tokendb WHERE token = ?',[token]);
    if(checkLog.length>0){
        return res.status(200).json({
            message : 'Yes'
        });
    }else{
        return res.status(200).json({
            message : 'No'
        });
    }
}

module.exports = AmILogged;