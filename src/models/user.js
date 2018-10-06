const mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcryptjs'),
SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();
    user.password = bcrypt.hashSync(user.password, SALT_WORK_FACTOR);
    next();
})

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);