
const passport = require('passport')

// for session authorization
// exports.authUser = function(req,res,next){
//     if(req.isAuthenticated()){
//         return next()
//     }
//     console.log('not authentictad')
//     return res.status(401).send({errors:{auth:'Not Authenticated'}})
    
// }

// exports.authUser = passport.authenticate('jwt', {session:false})
const jwt = require('jsonwebtoken')
exports.authUser = function(req,res,next){
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(token == null){
        return res.status(401).send({message:'please login'})
    }
    jwt.verify(token, 'kskskskdkdjf', function(err,data){
        if(err){
            res.status(400).send({message:`Your access token has expired,  pls login again to have access`})
            console.log(err.message)
        }else{
            User.findById(data.id,function(err,user){
                if(err){
                    return res.status(404).send(err)
                }
                else{
                    req.user = user
                    
                    next()

                }
            })
            // console.log(data)
            // req.user = data.id
            // req.token = token
           
            // next()
        }
        
        
    })

}
