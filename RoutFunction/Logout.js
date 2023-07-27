const dbConnection = require('../Config/Db')
async function Logout(req, res){
    const authorizationHeader = req.headers['authorization'];
    const {usersl} = req.params;
    const token = authorizationHeader.split(' ')[1];

    const [deltoken] = await dbConnection.query('DELETE FROM tokendb WHERE token = ?',[token]);
    if(deltoken){
        return res.status(200).json({
            message : 'Logout Successful'
        });
    }
} 

module.exports = Logout;