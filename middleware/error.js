function errorHandle(err, req, res, next){
    let sttuscode = 500;
    let msg = "Sorry Directory Error" ; 

    if (err.status && err.message) {
        sttuscode = err.status;
        msg = err.message;
      }

    res.status(404).json({ error: 'Resource not found' });

}

module.exports = errorHandle ;