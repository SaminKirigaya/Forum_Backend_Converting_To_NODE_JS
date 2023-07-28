const dbConnection = require('../Config/Db');

async function Report(req, res) {
    var {usersl, postno} = req.params;
    var [postExist] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?',[postno]); 
    if(postExist.length>0){
        var [reportAmount] = await dbConnection.query('SELECT * FROM report WHERE post_slno = ?',[postno]);
        if(reportAmount.length>30){
            var [delPost] = await dbConnection.query('DELETE FROM posts WHERE slno = ?',[postno]);
            if(delPost){
                await dbConnection.query('DELETE FROM comments WHERE post_slno = ?',[postno]);
                return res.status(200).json({
                    message : 'Post Successfully Deleted.'
                })
            }else{
                return res.status(200).json({
                    message : 'Post Might Have Been Already Deleted.'
                })
            }

        }else{
            var [userMail]= await dbConnection.query('SELECT email FROM users WHERE slno = ?',[usersl]);
            var [reportExist] = await dbConnection.query('SELECT * FROM report WHERE post_slno = ? AND email = ?',[postno, userMail[0].email]);
            if(reportExist.length>0){
                return res.status(200).json({
                    message : 'You May Have Already Reported It.'

                })
            } else{
                await dbConnection.query('INSERT INTO report (post_slno, email) VALUES (?, ?)',[postno, userMail[0].email]);
                return res.status(200).json({
                    message : 'Report Successful.'
                })
            }
        }
    }
}

module.exports = Report;