const { JsonWebTokenError } = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');
const User = require('./models/User/user');
const user = require('./models/User/user');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user)  {                   //generates a new JWT for a user
let token= jwt.sign(user,config.secretKey, {expiresIn: 3600} );
return token;
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();       //token will be sent as bearer token in auth header
opts.secretOrKey = config.secretKey;


exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload,done) => {
    console.log("JWT payload: ",jwt_payload);
    user.findOne({_id: jwt_payload._id},(err,user) => {
        if(err) {
            return done(err, false);
        }
        else if(user) {
            return done(null,user);
        }
        else {
            return done(null,false);
        }
    })
}));

exports.verifyUser = passport.authenticate('jwt',{session: false});

exports.verifyAdmin = (req, res, next) => {
    User.findOne({_id: req.user._id})
    .then((user) => {
        if (user.admin) {
            next();              //move ahead only if user is admin
        }
        else {
            err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        } 
    }, (err) => next(err))
    .catch((err) => next(err))
}

