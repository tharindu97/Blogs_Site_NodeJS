const User = require('../database/models/Users');

module.exports = (req,res,next) =>{

    // fetch user from database
    User.findById(req.session.userId, (error, user) =>{
        if(error || !user){
            return res.redirect('/');
        }
        next()
    })
    // verfiy user 

    // if user is valid, permit request

    // else redirect

}