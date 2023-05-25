require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const customMiddleWare = require('./utils/middleware');
// Setting up Express App
const app = express();

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));

// Connection to MongoDB

const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

// Connect to mongodb database
const DBURI = process.env.NODE_ENV === 'development' 
? process.env.TEST_MONGODB_URI 
: process.env.MONGODB_URI
console.log("Database_URL", DBURI);
console.log('Connecting to ', DBURI)
mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((res) => {
          console.log('Successfully connected!')
        })
        .catch((err) => console.log(err))


// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('build'));

// Express routers
app.use('/api/note', indexRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(customMiddleWare.unknownEndpoint);
app.use(customMiddleWare.errorHandler);


module.exports = app;
