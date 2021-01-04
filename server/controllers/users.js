const User = require("../models/users");
const passport = require("passport");
const jwt = require('jsonwebtoken')
const Meetup = require('../models/meetups');
const Thread = require('../models/threads');
const Post = require('../models/posts');
const Category = require('../models/categories');

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
  

  if(!user) {
    return res.sendStatus(422);
  }
  
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
            expiresIn: '2d',
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

// @facet
// Processes multiple aggregation pipelines within a single stage on the same set of input documents.
// Each sub-pipeline has its own field in the output document where its results are stored as an array of documents.


// meetups: find all of the meetups where meetupCreator is loggedIn user
//          find only 5 meetups
//          sort meetups by newest ones

// meetupsCount: find all of the meetups where meetupCreator is loggedIn user
//               don't return data but count of all meetups

function fetchMeetupsByUserQuery (userId) {
  return Meetup.aggregate([
    { "$facet": {
      "meetups": [
        { "$match": {"meetupCreator": userId}},
        { "$limit": 5 },
        { "$sort": {"createdAt": -1} }
      ],
      "meetupsCount": [
        { "$match": {"meetupCreator": userId}},
        { "$count": "count" }
      ]
    }}
  ])
  .exec()
  .then(results => {
    return new Promise((resolve, reject) => {
      Category.populate(results[0].meetups, {path: 'category'})
      .then(pMeetups => {
        if (pMeetups && pMeetups.length > 0) {
          resolve({data: pMeetups, count: results[0].meetupsCount[0].count});
        } else {
          resolve({data: results[0].meetups, count: 0})
        }
      })
    })
  })
}

function fetchThreadsByUserQuery (userId) {
  return Thread.aggregate([
      { "$facet": {
        "threads": [
          { "$match": {"user": userId}},
          { "$limit": 5 },
          { "$sort": {"createdAt": -1} }
        ],
        "threadsCount": [
          { "$match": {"user": userId}},
          { "$count": "count" }
        ]
      }}
    ])
  .exec()
  .then(results => {
    const threads = results[0].threads;
    if (threads && threads.length > 0) {
      return {data: threads, count: results[0].threadsCount[0].count}
    }

    return {data: threads, count: 0}
  })
}

function fetchPostByUserQuery (userId) {
  return Post.aggregate([
      { "$facet": {
        "posts": [
          { "$match": {"user": userId}},
          { "$limit": 5 },
          { "$sort": {"createdAt": -1} }
        ],
        "postsCount": [
          { "$match": {"user": userId}},
          { "$count": "count" }
        ]
      }}
    ])
  .exec()
  .then(results => {
    const posts = results[0].posts;
    if (posts && posts.length > 0) {
      return {data: results[0].posts, count: results[0].postsCount[0].count}
    }

    return {data: results[0].posts, count: 0}
   }
)}

exports.getUserActivity = function (req, res) {
  const userId = req.user._id;

  Promise.all(
    [fetchMeetupsByUserQuery(userId),
     fetchThreadsByUserQuery(userId),
     fetchPostByUserQuery(userId)
    ])
    // Writing [] to get data from the array
    .then(([meetups, threads, posts]) => res.json({meetups, threads, posts}))
    .catch(err => {
      console.log(err)
      res.status(422).send({err})
      })
}

// this will exports a function
exports.updateUser = (req, res) => {
  const userId = req.params.id ;
  const userData = req.body;
  const user = req.user;
  console.log(userId)
  console.log(user._id)
  
    if(userId == user._id){
    User.findByIdAndUpdate({_id:userId},{$set:userData}, {new:true},(err,data) => {
        if(err){
          return res.status(422).send({err})
        }else{
          return res.status(200).json(data)
        }
    })
  }else{
    return res.status(422).send({errors: 'Authorization Error!'})
  }
  // if (user._id == userId) {
  //   //new: bool - true to return the modified document rather than the original. defaults to false
  //   User.findByIdAndUpdate(userId, { $set: userData}, { new: true }, (errors, updatedUser) => {
  //     if (errors) return 
  //     res.status(422).send({errors});
      
  //     return res.json(updatedUser);
  //   });
  // } else {

  //   return res.status(422).send({errors: 'Authorization Error!'})
  // }
}

