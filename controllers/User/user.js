const User = require('../../models/User/user');
const config = require('../../config');
const passport = require('passport');
const jwt = require("jsonwebtoken");
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

  if(!req.body.username || !req.body.password)
  {
    res.status(400).json({"msg": "Either username or password field is empty"});
  }

  else {
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
   
}

exports.loginUser = async (req , res) => {

    const { user} = await User.authenticate()(req.body.username, req.body.password);
    if(!user)
    {
      return res.status(404).json("user not found");

    }
    req.user=user;
    var token = await req.user.generateAuthToken();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'You are successfully logged In !',token: token});

};

exports.logoutUser = async (req,res) => {

    console.log(req.token);
    
    try {
        req.user.tokens= req.user.tokens.filter((token)=>{

           return jwt.verify(token.token, config.secretKey,(err,data)=>{

              if(!err && token.token!=req.token)
              {
                return true;
              }
              return false;

            });
            
        })

        await req.user.save();

        res.status(200).json(req.user);
        
    } catch (error) {
        res.status(500).json(error);
        
    }
    
}
exports.logoutUserAll = async (req,res) => {

    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).json("logout Success");
    } catch (error) {
        res.status(500).send("unable to logout");
        
    }
    
}