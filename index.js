const express = require('express');
const env = require('./config/environment');
const  logger = require('morgan');

const app = express();

// Setup for cookie
const cookieParser = require('cookie-parser');
const port = 8000;


// set up the layouts
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

// setup database
const db = require('./config/mongoose');

// use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');
const path = require('path');

app.use(express.urlencoded()); //add body-parser

// cookie
app.use(cookieParser());

// use assets like css js and images
// app.use(express.static('./assets'));
app.use(express.static(__dirname + env.asset_path));
app.use(logger(env.morgan.mode, env.morgan.options))


// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'placementcellapp', 
    //Todo change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false, 
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    Store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/placementcellapp_devlopment', 
        autoRemove: 'disable'
    },function(err){
        console.log(err || 'connect-mongodb setup OK');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error is running the server: ${err}`);
    }

    console.log(`Server is running in port: ${port}`);
});