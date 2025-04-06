require("dotenv").config();
var passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/User/user");
const GoogleStrategy = require("passport-google-oauth20");
const jwt = require("jsonwebtoken");

const getTokenFromRequest = (req, sso=false) => {
  // 1. Check cookie
  if (req && sso=='true' && req.cookies && req.cookies.UNKNOWN39825_AUTH) {
    console.log(req.cookies);
    return req.cookies.UNKNOWN39825_AUTH;
  }

  // 2. Fallback to header
  return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
};

const opts = {
  jwtFromRequest: getTokenFromRequest,
  secretOrKey: process.env.secretKey,
  passReqToCallback: true,
};

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, async (req, jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id, "tokens.token": opts.jwtFromRequest(req) })
      .then((user) => {
        if (!user) {
          return done(null, false);
        } else {
          req.token = opts.jwtFromRequest(req);
          return done(null, user);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
  
exports.googlePassport = passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: process.env.FRONTEND + `/user/auth/google/callback`,
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
exports.googgleRedirect =
  (passport.authenticate("google"),
  (req, res) => {
    console.log("redirected", req.user);
    let user = {
      displayName: req.user.displayName,
      name: req.user.name.givenName,
      email: req.user._json.email,
      provider: req.user.provider,
    };
    console.log(user);
    // res.json(user);
  });

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then(
      (user) => {
        if (user.admin) {
          next(); //move ahead only if user is admin
        } else {
          res.status(403).json({ error: "Admin access required !!" });
          return next(res);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

exports.isVerifiedUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(
      (user) => {
        if (!user) {
          res.status(400).json({ error: "The given Email does not exists" });
          return next(res);
        } else if (user.isVerified) {
          next();
        } else {
          res
            .status(403)
            .json({ error: "Your account has not been verified !!" });
          return next(res);
        }
      },
      (err) => next(err)
    )
    .catch((err) => {
      res.status(400).json({ error: err });
      return next(res);
    });
};

exports.verifyToken = (req, res) => {
  const sso = req.query.sso || false;
  console.log(sso)
  if (!opts.jwtFromRequest(req,sso)) {
    return res.status(404).json({ success: false, error: "Token Missing !!" });
  } else {
    jwt.verify(
      opts.jwtFromRequest(req,sso),
      process.env.secretKey,
      (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, error: err.message, status: err.name });
        }

        if (!decoded) {
          return res
            .status(500)
            .json({ success: false, error: "Something went wrong" });
        }

        User.findOne({
          email: decoded.email || decoded.sub,
        })
          .then(async (user) => {
            const token = await user.generateAuthToken()
            return res.json({
              status: "success",
              msg: "You are successfully logged In !!",
              token: token,
              admin: user?.admin,
              userId: user._id,
            });
          })
          .catch((err) => {
            throw new Error("Error finding user: " + err.message);
          });
      }
    );
  }
};
