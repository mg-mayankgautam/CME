//npm init
//npm i express dotenv hbs mongo mongoose nodemon body-parser express-session connect-mongodb-session


require("dotenv").config();

const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 4700;

const bodyparser = require('body-parser');//use with axios 

const cors = require('cors');
const cookieParser = require('cookie-parser');


app.use(cors(
    {
        // origin: process.env.FRONTEND_URL, 
        
        origin: "http://localhost:3009",
        // origin: '*',
        credentials: true,
        withCredentials: true
    }
))


app.use((req, res, next) => {

//  console.log(req.cookies);

    res.setHeader(
        "Access-Control-Allow-Origin",
     
        "http://localhost:3009"
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    
    next();
})

const mongoose = require('mongoose');
// const { mongoConnect } = require('./database/database.js');



// const session = require('express-session')
// const MongoDBsession = require('connect-mongodb-session')(session);//use with session

// const store = new MongoDBsession({
//     uri: process.env.MONGODB_URL,
//     collection: "mysessions"
// });

app.use(cookieParser())

// app.use(
//     session({
//         secret: 'secret key for cookie',
//         resave: false,
//         saveUninitialized: false,
//         store: store,
//         cookie: { secure: false }
//     })
// );





app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json()); 
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'photos')));


const AuthRouter = require('./routes/authentication.js');
app.use('/', AuthRouter);

const refreshRouter = require('./routes/refresh.js');
app.use('/refresh',refreshRouter)


//////USE BELOW CODE WITH MONGOOSE  
//////

mongoose.connect(process.env.MONGODB_URL, {
    //    useNewUrlParser: true,
    //    useUnifiedTopology: true,
    // useCreateIndex: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        })
    })
    .catch(err => { console.error(err); });

// app.listen(PORT, () => {
//                 console.log(`http://localhost:` + PORT);
//             })
// console.log(`http://localhost:` + PORT);