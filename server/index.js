const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const session = require('express-session')
const passport = require('passport')
//const mongoStore = require('connect-mongodb-session')(session)

const app = express();
const path =require('path')




// const sessionStore = new mongoStore({
//   url:config.DB_URI,
//   collection:'session',

// })

// sessionStore.on('error', function(error){
//   console.log(error)
// })

// })
// const store = new MongoDBStore({
//   url:config.DB_URI,
//   collection:'meetup'
// })

require("./models/meetups");
require("./models/users");
require("./models/threads");
require("./models/posts");
require("./models/categories");
require("./services/passport")

const meetupsRoutes = require('./routes/meetups'),
      usersRoutes = require('./routes/users'),
      threadsRoutes = require('./routes/threads'),
      postsRoutes = require('./routes/posts'),
      categoriesRoutes = require('./routes/categories');

mongoose.connect(config.DB_URI, { useNewUrlParser: true,useUnifiedTopology:true })
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log(err));



app.use(bodyParser.json());
// app.use(session({
//   secret:'kksksksks',
//   cookie:{
//     maxAge:3600000,
//   },
//     resave:false,
//     saveUninitialized:false,
//     store:sessionStore

// }))

app.use(passport.initialize())
// app.use(passport.session())

// app.use(function(req,res,next){
//   console.log(req.session)
//   next()
// })
global.User = require("./models/users");

app.use(function(req,res,next){
  console.log(req.headers.Authorization)
  next()
})
app.use('/api/v1/meetups', meetupsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/threads', threadsRoutes);
app.use('/api/v1/categories', categoriesRoutes);

 if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT , function() {
  console.log('App is running on port: ' + PORT);
});
