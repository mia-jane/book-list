const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//pre-save hook to encrypt passwords on signup
// must use function syntax, not arrow fntn bc need to use "this"
userSchema.pre("save", function(next){
    const user = this
    if(!user.isModified("password")) return next   //only happen on signup here
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err)
        user.password = hash
        next()
    })
})

//method to check encrypted pw on login
userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

//remove password for token/ sneding response so doesn't show up on front end
userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema)