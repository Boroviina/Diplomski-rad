const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const {toJSON, paginate} = require('./plugins');
const {roles} = require('../config/roles');

const userSchema = new mongoose.Schema({
        name: {type: String, required: true, trim: true,},
        lastname: {type: String, trim: true},
        email: {type: String, required: true, unique: true, trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            }
        },
        password: {type: String, required: true, trim: true, minLength: 8,private: true,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number');
                }
            },
        },
        role: {type: String, enum: roles, default: 'user',},
        active: {type: Boolean, default: false},
        isEmailVerified: {type: Boolean, default: false,},
    },
    {
        timestamps: true,
        bufferCommands: false,
        autoCreate: false,
        collection: 'user'
    }
)

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({email, _id: {$ne: excludeUserId}});
    return !!user;
}

userSchema.methods.isPasswordMatching = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();

});

const User = mongoose.model('User', userSchema);

module.exports = User;