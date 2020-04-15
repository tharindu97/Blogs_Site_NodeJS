const User = require('../database/models/Users');

module.exports = (req,res) =>{
    User.create(req.body, (error, user) =>{
        res.redirect('/');
    })
}