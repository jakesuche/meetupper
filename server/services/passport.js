const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;


// Only for session authentication
// passport.serializeUser(function(user,done){
//     done(null, user.id)
// })

// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err,user){
//         done(err,user)
//     })
// })

passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
}, (email,password,done)=>{
    User.findOne({email},function(err,user){
        if(err){return done(err)}
        if(!user){return done(null,false)}

        user.comparePassword(password, function(err,isMatch){
            if(err){return done(err)}
            if(!isMatch){return done(null, false)}
            
            return done(null, user)
        })
    })

}))




const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
    secretOrKey:'my authentication'

}

passport.use(new JwtStrategy(jwtOptions, function(payload, done){
    console.log(payload,'hshshshhdh')
    User.findById(payload.id, function(err,user){
        
        if(err){return done(err,false)}
        if(user){
            done(null,user)
        }else{
            done(null,false)
        }
    })
}))






