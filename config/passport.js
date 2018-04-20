const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load use models
const User = mongoose.model('users');

module.exports = function(passport){
  passport.use(new LocalStrategy(
    {usernameField: 'email'},

    (email,password,done)=>{
      //Match User
      User.findOne({
        email:email
      }).then(user=>{
          console.log('err');
          if(!user){
            return done(null, false,{message: 'No user found'});
          }

          //Match password
          bcrypt.compare(password,user.password,(err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
              done(null,user);
            } else {
              return done(null, false,{message: 'Password Incorrect'});
            }
          })
      })
    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
