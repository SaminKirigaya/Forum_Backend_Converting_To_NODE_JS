function routeHandle (req, res, next){
    try{
        let router = require('../routes/route');
        app.use(router);

        next();

    }catch(err){
        console.log(err);
        next(err);
    }
}

module.exports = routeHandle;