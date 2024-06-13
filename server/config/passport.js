const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const config = require('./config');
const {tokenTypes} = require('./tokens');
const {User} = require('../models');

//control how the token is extracted from the request
const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

//payload object containing the decoded JWT payload
const jwtVerify = async (payload, done) => {        //payload contains data decoded from JWT token
    try {
        if (payload.type !== tokenTypes.ACCES) {
            throw new Error('Invalid token type');
        }
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (e) {
        done(e, false);
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
module.exports={
    jwtStrategy
}