const dbConnection = require('../Config/Db')

async function Profile(req, res){
    var userSerial = '';
    var userEmail = '';
    var userImg = '';
    var userCountry = '';
    var userAge = '';
    var userGender = '';
    var userJoined = '';


    const {usersl} = req.params;
    const [all_data] = await dbConnection.query('SELECT * FROM users WHERE slno = ?',[usersl]);
    await Promise.all(all_data.map(async(datas)=>{
        userSerial = datas.slno;
        userEmail = datas.email;
        userImg = datas.imglink;
        userCountry = datas.country;
        userAge = datas.age;
        userGender = datas.gender;
        userJoined = datas.joined;
    }))

    return res.status(200).json({
        message : 'Successful',
        serial :  userSerial,
        email : userEmail,
        imagelink : userImg,
        country : userCountry,
        age : userAge,
        gender : userGender,
        joined : userJoined
    });
}

module.exports = Profile;