const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/prod');
const cors = require('cors')
// const session = require('express-session')
const passport = require('passport')
//const mongoStore = require('connect-mongodb-session')(session)
const allowedoOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100'
]

// const corsOptions = {
//   origin: (origin, callback) => {
//     if(allowedoOrigins.includes(origin) || !origin){
//       callback(null,true)
//     }else{
//       callback(new Error('Origin not allowed'))
//     }
//   }
// }
const app = express();
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','*')
  next()
})

// app.options('*', cors(corsOptions))



const server = require('http').createServer(app)
// const io = require('socket.io')(server, {pingTimeout:60000})

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});





require('./socket')(io)
io.on('connection', function(socket){
  console.log('connection established')
})
const path =require('path')
// const helmet = require('helmet')
// const xssClean = require('xss-clean')
// const expressRateLimit = require('express-rate-limit');
// const hpp = require('hpp')

// helmet 
// app.use(helmet())

// //prevent xss attack 
// app.use(xssClean())

// app.use(hpp())
// // express rate limiting 
// const limiter = expressRateLimit({
//   windowMs:10 * 60 *1000,
//   max: 100
// })

// app.use(limiter)







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
 const  apiRoute = require('./routes/api');

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
app.use('/api/v1',apiRoute)
app.use('/api/v1/meetups', meetupsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/threads', threadsRoutes);
app.use('/api/v1/categories', categoriesRoutes);


 ////if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
//}

const PORT = process.env.PORT || 3001;

server.listen(PORT , function() {
  console.log('App is running on port: ' + PORT);
});
