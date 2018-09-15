const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, required: true},
    password: { type: String, required: true},
    name: {type: String, required: true}
}, {
    timestamps: true
});

UserSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            next(err);
        }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err){
                next(err);
            }
            user.password = hash;
            next();
        })
    })
})

UserSchema.methods.compararPassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, sinIguales)=>{
        if(err){
            return cb(err);
        }
        cb(null, sinIguales);
    })
}

module.exports = mongoose.model('User', UserSchema);