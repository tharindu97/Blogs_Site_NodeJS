const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true, 'Please Provide your username']
    },
    email: {
        type:String,
        required:[true, 'Please Provide your email'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Please Provide your password']
    }
});

UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password, 10, function(error, encrupted){
        user.password = encrupted;
        next();
    });
});

module.exports = mongoose.model('User', UserSchema);