require("dotenv").config();
const User = require("../../models/User/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
var validator = require('validator');
const passport = require("passport");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//only admin can get list of all users
exports.getUser = async (req, res) => {
  await User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      if (err) return res.status(500).json({error: err});
    });
};

//anyone can register
exports.registerUser = async (req, res) => {
        if ( !req.body.password || !req.body.email) {
          return res.status(400).json({ msg: "Either password/Email field is empty" });
        } 
     
        if(!validator.isEmail(req.body.email))
        {
          return res.status(400).json({error:"Invalid email !!"});
        }
        
        else {
             
              var newUser = new User({
                email: req.body.email,
                emailToken: crypto.randomBytes(64).toString("hex"),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
              });
              await User.register(
                newUser,
                req.body.password,
                async (err, user) => {
                  if (err) {
                    console.log({error: err});
                    return res.status(409).json({error:"Email already exits"});
                  }

                  const msg = {
                    from: "freeosenior@gmail.com",
                    to: user.email,
                    subject: "FreeOSenior Registration - Verify your Email",
                    text: `Hi there, Thanks for registering on freeOsenior !!,
                        Please copy and paste the url given below to verify your account: 
                        http://${req.headers.host}/user/verify-email?token=${user.emailToken}`,
                    html: `<h1>Hi there,</h1>
                          <p>Thanks for registering on freeOsenior !!</p>
                          <p>Please click on the link given below to verify your account:</p>
                          <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">Verify your account</a>`,
                  };

                  user.salt=undefined;
                  user.tokens=undefined;
                  user.hash=undefined;
                  user.emailToken=undefined;
                  try {
                    await sgMail.send(msg); //calling sendgrid to send email to the user's mail
                    return res.status(200).json({
                      status: "success",
                      msg:
                        "Thanks for Registering !! Please check your email for verification",
                      user: user,
                    });
                    
                  } catch (err) {
                    if (err) {
                      res.status(500).json({error: "Something went Wrong !!",desc: err});
                      return;
                    }
                  }
                }
              );
        }
};

//email verification api
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ emailToken: req.query.token });
    if (!user) {
      res.status(401).json({error: "Token Invalid !!, Please try registering again !!"});
      
      return;
    }
    user.emailToken = null;     //detroying the token so that no one else can use this link again
    user.isVerified = true;
    await user.save();
    res.status(200).json({ status: "success", "msg" : "Email Verification Successfull !!" });
  } catch (error) {
    if (error) {
      res.status(500).json({ error: "Something went Wrong !!", desc: error });
      
      return;
    }
  }
};
//otp verification api
exports.verifyOtp = async (req, res) => {
  // console.log(req.body);
  if (req.body.otp.trim() === "" || req.body.password.trim() === "" || req.body.email.trim() === ""
  )
  {
    return res.status(400).json({error:"please fill the valid details"})
  }
    try {
      const user = await User.findOne({
        name: req.body.name,
        emailToken: req.body.otp,
      });
      if (!user) {
        res.status(401).json({ error: "Invalid otp or Email!" });
        
        return;
      }
      user.emailToken = null; //detroying the token so that no one else can use this link again
      user.isVerified = true;
     await user.setPassword(req.body.password,(err,user)=>{

      if(err)
      {
        return res.status(200).json({error:"unable to set password"});
      }
      user.save();
      
      res
        .status(200)
        .json({ status: "success", msg: "Pasword validated success !!" });
      })
      
    } catch (error) {
      if (error) {
        res.status(500).json({ error: "Something went Wrong !!", desc: error });
        return;
      }
    }
};

// forgot password
exports.forgotPassword = async (req, res) => {
  console.log("forgot called");
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({error: "Invalid Email"});
      return;
    }
    var otp = Math.random()*1000000;
    otp = parseInt(otp);
    // console.log(otp);
    user.emailToken = otp; //adding the otp

     const msg = {
       from: "freeosenior@gmail.com",
       to: user.email,
       subject: "FreeOSenior Password Reset",
       text: `Hi there, Forgot Your Password!!,
                        Enter the given otp to reset your password`,
       html: `<h1>Hi there,</h1>
                          <h2>Your OTP is :${otp}</h2>
                          `,
     };

    user.isVerified = false;
    await user.save();
     await sgMail.send(msg); //calling sendgrid to send email to the user's mail
                    return res.status(200).json({
                      status: "success",
                      msg:
                        "Otp Sent Enter the otp",
                      
                    });
  } catch (error) {
    if (error) {
      res.status(500).json({ error: "Something went Wrong !!", desc: error });
      return;
    }
  }
};

exports.loginUser = async (req, res) => {
  const { user } = await User.authenticate()(
    req.body.email,
    req.body.password
  );
  if (!user) {
    return res.status(404).json({ error: "Invalid Credentials !!" });
  }
  req.user = user;
  var token = await req.user.generateAuthToken();
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ status: "success" , "msg" : "You are successfully logged In !!", token: token,admin:user.admin,userId:user._id });
  return;
};

exports.logoutUser = async (req, res) => {
  console.log(req.token);

  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return jwt.verify(token.token, process.env.secretKey, (err, data) => {
        if (!err && token.token != req.token) {
          return true;
        }
        return false;
      });
    });

    await req.user.save();

    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({error: error});
  }
};

exports.logoutUserAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json("logout Success");
  } catch (error) {
    res.status(500).send({error: "unable to logout",desc: error});
  }
};

exports.gauth = async (req, res) => {
  // console.log("redirected", req.user);
  let user = {
    firstname: req.user.name.givenName,
    lastname: req.user.name.familyName,
    email: req.user._json.email,
    googleId: req.user.id,
  };

  User.findOne({ email: user.email }).exec(async (err, data) => {
    try {
      if (err) {
        console.log("error");
        return res.status(400).json({ error: err });
      }

      if (!data) {
        console.log("user not found");
        const newuser = new User(user);
        newuser.isVerified = true;
        req.user = newuser;
      } else {
        req.user = data;
        req.user.isVerified=true;
      }

      await req.user.save();
      var token = await req.user.generateAuthToken();
      var admin = req.user.admin;

      var userId= req.user._id;

      const redirectURL = `${prcess.env.FRONTEND}/saveToken?JWT=${token}&admin=${admin}&userId=${userId}`;
      res.redirect(redirectURL);
    } catch (error) {
      if (error) res.status(400).json({ error: error });
      return;
    }
  });
};

// exports.googleLogin = async (req, res) => {          //TODO

//   await User.findOne({email: req.body.email},async  (err, user) => {

//     if(user) {                                              //if same user as already registered without google auth
//       user.googleId=req.body.id;                             //set its google id
//       user.isVerified=true;
//       await user.save();
//       req.user=user;
//       var token = await req.user.generateAuthToken();
//       return res.status(200).json({ status: "success" , "msg" : "You are successfully logged In !!", token: token ,admin:req.user.admin });
//     }

//     else {
//       var newUser = new User({                                   //register a new user
//         email: req.body.email,
//         firstname: req.body.givenName,
//         lastname: req.body.familyName,
//         googleId: req.body.id,
//         isVerified: true  
//       });
//       await newUser.save(async (err,user) => {
//         if(err) {
//           return res.status(400).json({error: err});
//         }
//         req.user=user;
//         var token = await req.user.generateAuthToken();
        
//         return res.status(200).json({ status: "success" , "msg" : "You are successfully logged In !!", token: token,admin:req.user.admin });

//       });
      
//     }
//   });
// }
    