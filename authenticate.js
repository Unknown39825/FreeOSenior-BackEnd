var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var JwtStrategy = require('passport-jwt').Strategy;
// var ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken");
var config = require('./config');
const User = require('./models/User/user');
// const user = require('./models/User/user');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// var opts = {};
// opts.jwtFromRequest =  ExtractJwt.fromAuthHeaderAsBearerToken();       //token will be sent as bearer token in auth header
// opts.secretOrKey = config.secretKey;

// exports.jwtPassport = passport.use(new JwtStrategy(opts, async (jwt_payload,done) => {
//     console.log(jwt_payload);
//     user.findOne({_id: jwt_payload._id},(err,user) => {
//         if(err) {
//             return done(err, false);
//         }
//         else if(user) {
//             return done(null,user);
//         }
//         else {
//             return done(null,false);
//         }
//     })
// }));

exports.verifyUser =  async (req,res,next)=>{

    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      
      const decoded = jwt.verify(token, config.secretKey);
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      if (!user) {
        throw new Error();
      }

      req.token = token;
      req.user = user;
      
      next();
    } catch (e) {
      res.status(401).send({ error: "You are not Logged in" });
    }

}

exports.verifyAdmin = (req, res, next) => {
    User.findOne({_id: req.user._id})
    .then((user) => {
        if (user.admin) {
            next();              //move ahead only if user is admin
        }
        else {
            res.status(403).json({"msg" : "Admin access required !!"});
            return next(res);
        } 
    }, (err) => next(err))
    .catch((err) => next(err))
}
