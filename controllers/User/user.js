require("dotenv").config();
const User = require("../../models/User/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var validator = require('validator');
//only admin can get list of all users
exports.getUser = async (req, res) => {
  await User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      if (err) return res.status(500).json(err);
    });
};

//anyone can register
exports.registerUser = async (req, res) => {
        if ( !req.body.password || !req.body.email) {
          return res.status(400).json({ msg: "Either password/Email field is empty" });
        } 
        // var validator = require('validator');

// validator.isEmail('foo@bar.com'); //=> true

        if(!validator.isEmail(req.body.email))
        {
          return res.status(400).json({error:"invalid email"});
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
                    console.log(err);
                    return res.status(400).json({error:"Email already exits"});
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
                      res.status(500).json("Something went Wrong !!");
                      
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
      res.status(401).json("Token Invalid !!, Please try registering again !!");
      res.redirect("/");
      return;
    }
    user.emailToken = null; //detroying the token so that no one else can use this link again
    user.isVerified = true;
    await user.save();
    res.status(200).json({ status: "Email Verification Successfull !!" });
  } catch (error) {
    if (error) {
      res.status(500).json({ status: "Something went Wrong !!", error: error });
      res.redirect("/");
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
    return res.status(404).json({ msg: "Invalid Credentials !!" });
  }
  req.user = user;
  var token = await req.user.generateAuthToken();
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ status: "You are successfully logged In !", token: token });
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
    res.status(500).json(error);
  }
};

exports.logoutUserAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json("logout Success");
  } catch (error) {
    res.status(500).send("unable to logout");
  }
};
