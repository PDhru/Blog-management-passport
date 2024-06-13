const passport = require('passport');
const userModel = require('../models/usermodel');


const localStrategy = require('passport-local').Strategy;

const localauth=(passport)=>{
    passport.use(new localStrategy( async (username, password, done) => {
        console.log(username,password);
        const user = await userModel.findOne({ username:username });
        console.log(user);
        if (!user) {
            return done(null, false, { message: 'No user found' });
        }
        if (user.password != password) {
            console.log("not checking password");
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
}
module.exports=localauth;