
const dbConnection = require('../Config/Db')

async function Authentication(req, res, next){
    const authorizationHeader = req.headers['authorization'];
    const {usersl} = req.params;
    const token = authorizationHeader.split(' ')[1];
    const [user] = await dbConnection.query('SELECT * FROM users WHERE slno = ?',[usersl]);
    if(user.length > 0){
        const [tokenz] = await dbConnection.query('SELECT * FROM tokendb WHERE token = ?',[token]);
        if(tokenz.length>0){
            const [user_mail] = await dbConnection.query('SELECT email FROM users WHERE slno = ?',[usersl]);
            const [token_mail] = await dbConnection.query('SELECT user_email FROM tokendb WHERE token = ?',[token]);

            if(user_mail[0].email == token_mail[0].user_email){
                next();
            }

        }
    }else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = Authentication;