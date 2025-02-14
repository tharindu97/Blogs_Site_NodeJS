const User = require('../database/models/Users');
const bcrypt = require('bcrypt');

module.exports = (req,res) =>{
    const { email, password } = req.body;
    //try to find the users
    User.findOne({ email }, (error, user) => {
        if(user){
            //compare user password.
            bcrypt.compare(password, user.password, (error, same) =>{
                if(same){
                    req.session.userId = user._id;
                    res.redirect('/')
                }else{
                    res.redirect('/auth/login')
                }
            })
        }
    });
 
}