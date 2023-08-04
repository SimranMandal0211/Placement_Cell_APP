const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// aurhentication using Passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async function(email, password){
        try{
            let user = await User.findOne({email: email});
            if (!user || user.password != password){
                return false;
                // null- no error  and  false- authentication
            }
            return user;
        }catch(err){
            console.log('Error in finding user -> Passport', err);
            throw err;
        }
    }
));

// serialize- the user to decide which key is to be kept in the cookies 
// serializeUser- inbuild function

// (we find id --> sended to cookie --> browser)
passport.serializeUser(function(user) {
    return user.id;
});

// (browser make request --> deserialize --> find user again)
// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id){
    try{
        let user = await User.findById(id).exec();
        return user;
    }catch (err) {
        console.log('Error in finding user -> Passport', err);
        throw err;
    }
});

module.exports = passport;