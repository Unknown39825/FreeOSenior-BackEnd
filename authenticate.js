require("dotenv").config();
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User/user');
const GoogleStrategy = require("passport-google-oauth20");

var opts = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),// toe get token from the auth header
  secretOrKey : process.env.secretKey,// secret key
  passReqToCallback:true//to pass req to the callback
};

exports.jwtPassport = passport.use(new JwtStrategy(opts, async (req,jwt_payload,done) => {
  
    User.findOne(
      { _id: jwt_payload._id, "tokens.token": opts.jwtFromRequest(req)},
      (err, user) => {
        if (err) {
          return done(err, false);
        } else if (user) {
          req.token=opts.jwtFromRequest(req);
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    );
}));

exports.googlePassport = passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: `https://free-o-senior.herokuapp.com/user/auth/google/callback/`,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    function (accessToken, refreshToken, profile, done) {
      //console.log(accessToken, refreshToken, profile)
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED");
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("I should have jack ");
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  console.log("I wont have jack shit");
  done(null, obj);
});

// conncent screen
exports.googleAuthentication = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// redirectd call
exports.googgleRedirect = (passport.authenticate('google'),(req,res)=>{
  console.log("redirected", req.user);
  let user = {
    displayName: req.user.displayName,
    name: req.user.name.givenName,
    email: req.user._json.email,
    provider: req.user.provider,
  };
  console.log(user);
  // res.json(user);
})

exports.verifyUser = passport.authenticate("jwt", { session: false });

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

exports.isVerifiedUser = (req,res,next) => {

      User.findOne({email: req.body.email})
      .then((user) => {
        if (user.isVerified) {
            next();              
        }
        else {
            res.status(403).json({"msg" : "Your account has not been verified !!"});
            return next(res);
        } 
    }, (err) => next(err))
    .catch((err) => next(err)) 
}
