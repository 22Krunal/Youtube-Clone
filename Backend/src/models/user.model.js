const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userShcema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trime: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trime: true,
    },
    fullname: {
        type: String,
        required: true,
        trime: true,
        index: true
    },
    avatar: {
        type: String,   //cloudinary url
        required: true,
    },
    coverImage: {
        type: String,   //cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    refreshToken: {
        type: String
    }
},{
    timestamps: true
})

userShcema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
     
    this.password = bcrypt.hash(this.password, 10);
    next();
})

userShcema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userShcema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userShcema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
const User = mongoose.model('User', userShcema);

module.exports = User;