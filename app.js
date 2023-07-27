require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const errorMw = require('./middleware/error');
const morgan = require('morgan');
app.use(morgan('tiny'));


app.use('/public/images', express.static(__dirname + '/public/images'));



//app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace with your frontend domain
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Replace with your custom headers, if any
    res.header('Access-Control-Allow-Methods', 'GET, POST'); // Allow only the GET method
    next();
  });

app.use(express.json());

function routeHandle (req, res, next){
    try{
        let router = require('./routes/route');
        app.use(router);

        next();

    }catch(err){
        console.log(err);
        next(err);
    }
}

app.use(routeHandle);


app.use(errorMw);

app.listen(process.env.PORT, ()=>{
    console.log("server running...");
})