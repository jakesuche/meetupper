const User = require("../models/users");
const passport = require("passport");
const jwt = require('jsonwebtoken')

exports.getUsers = function (req, res) {
  User.find({}).exec((errors, users) => {
    if (errors) {
      return res.status(422).send({ errors });
    }

    return res.json(users);
  });
};

exports.getCurrentUser = function (req, res, next) {
  const user = req.user;
  console.log('from getcurrent user',user)

  if(!user) {
    return res.sendStatus(422);
  }
  console.log(user)
  // for session auth
  // return res.json(user);
  
  return res.json(user)
  

};

exports.register = function (req, res) {
  const registerData = req.body;

  if (!registerData.email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }
  if (!registerData.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }
  if (registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: "not same as confirmation password",
      },
    });
  }

  const user = new User(registerData);

  user.save(function (errors, data) {
    if (errors) {
      return res.status(422).json({ errors });
    }
    return res.json({
      success: true,
      message: "user register successfully",
      data,
    });
  });
};

// exports.login = function (req, res, next) {
//   const { email, password } = req.body;

//   if (!email) {
//     return res.status(422).json({
//       errors: {
//         email: "is required",
//       },
//     });
//   }
//   if (!password) {
//     return res.status(422).json({
//       errors: {
//         password: "is required",
//       },
//     });
//   }

//   return passport.authenticate("local", (err, passportUser) => {
//     if (err) {
//       return next(err);
//     }

//     if (passportUser) {
//       // only for session auth
//       // req.login(passportUser, function (err) {
//       //   if (err) {
//       //     next(err);
//       //   }
//       //   return res.json(passportUser);
//       // });
//       return res.json(passportUser.toAuthJSON())
//     } else {
//       return res
//         .status(422)
//         .send({ errors: { authentication: "Ooops, something went wrong" } });
//     }
//   })(req, res, next);
// };

exports.login = function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "Please provide email and password" });
  } else {
    User.findOne({ email: email })
      .select("+password")
      .exec(function (err, user) {
        // User.findOne({ 'email': email }, function (err, user) {
        if (err) {
          throw err;
        }
        if (!user || !user.comparePassword(password, err)) {
          res.status(401).send({ message: "incorrect email or password" });
        } else {
          const token = jwt.sign({ id: user._id },'kskskskdkdjf', {
            expiresIn: '1h',
          });
          res.status(200).send({
            status: "success",
            email:user.email,
            username:user.username,
            avatar:user.avarta,
            info:user.info,
            name:user.name,
            joined:user.joinedMeetups,
            token,
            
          });
        }

        //})
      });
  }
}

exports.logout = function (req, res) {
  req.logout();
  return res.json({
    status: "session destroyed",
    message: "logout out successfully",
  });
};
