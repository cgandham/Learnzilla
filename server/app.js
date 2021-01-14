import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import model from './models';
import routes from  './routes';

// Connect to MongoURI exported from config
const keys = require('./config/keys');

//connection to local db
// mongoose.connect('mongodb://localhost:27017/demoDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {console.log('Connected to local db successfully')}).catch((err) =>
// {console.log("Failed to connect "+err)});

// mongoose.Promise = global.Promise;
//console.log(Date.now);
//connect to remote db using keys imported above
mongoose.connect(keys.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log('Connected to remote db successfully')}).catch((err) =>
{console.log("Failed to connect "+err)});

//initialize new express app
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//initialize created routes
routes(app);


export default app;
