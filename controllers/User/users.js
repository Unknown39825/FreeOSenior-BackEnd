const User = require('../../models/User/user');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('../../config');
const authenticate= require('../../authenticate');

//only admin can get list of all users
exports.getUser = (req,res) => {
    User.find({})
    .then((users)=> {
        res.status(200).json(users);
    })
    .catch((err)=> {
        if(err)
        return res.status(500).json(err);
    })
};

//anyone can register
exports.registerUser = (req,res) => {         //username and passowrd to be sent along with firstname and lastname in req body

    User.register(new User({username: req.body.username}),req.body.password , (err,user) => {
        if(err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
        }
        else {
          if (req.body.firstname)
            user.firstname = req.body.firstname;
          if (req.body.lastname)
            user.lastname = req.body.lastname;
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({err: err});
              return ;
            }
          passport.authenticate('local')(req,res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true , status: 'Registration Successful!',user: user});
          });
        });
        }
      })
}

exports.loginUser = (req , res) => {
    req.logIn(req.user, (err) => {
        if(err) {
            res.statusCode=401;
             res.json({status: "Login Unsuccessful !!"})
        }
    var token = authenticate.getToken({_id:req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'You are successfully logged In !',token: token});
});
};


exports.logoutUser = (req,res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.json("Logout Successfull !!");
      }
      else {
        var err = new Error('You are not logged in!');
        res.json(err);
      }
      //some issues with logout
      //we need to destroy token when logout is called
}