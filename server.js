require('dotenv').config();
const express = require('express')
const http = require('http')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

/*
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const socketio = require('socket.io')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth')

// Private api keys that you will get when registering an app on 
// apps.twitter.com
const TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  // make sure the callbackUrl matches what was set on Twitter
  // when registering the app
  callbackURL: 'http://127.0.0.1:3001/twitter/callback'
}

// Private api keys that you will get when registering an app on 
// google developer console
const GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_KEY,
  clientSecret: process.env.GOOGLE_SECRET,
  // make sure the callbackUrl matches what was set on Twitter
  // when registering the app
  callbackURL: 'http://127.0.0.1:3001/google/callback'
}
*/


// Create the server and allow express and socketio to run on the same port
const app = express()
const server = http.createServer(app)

/*
const io = socketio(server)
*/

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

/*
// Allows the application to accept JSON and use passport
app.use(express.json())
app.use(passport.initialize())

// Set up cors to allow us to accept requests from our client
app.use(cors({
  origin: 'http://localhost:3000'
})) 

// saveUninitialized: true allows us to attach the socket id
// to the session before we have authenticated with Twitter  
app.use(session({ 
  secret: 'KeyboardKittens', 
  resave: true, 
  saveUninitialized: true 
}))

// allows us to save the user into the session
passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

// Basic setup with passport and Twitter
passport.use(new TwitterStrategy(
  TWITTER_CONFIG, 
  (accessToken, refreshToken, profile, cb) => {
    
    // save the user right here to a database if you want
    const user = { 
        name: profile.username,
        photo: profile.photos[0].value.replace(/_normal/, '')
    }
    cb(null, user)
  })
)

// Basic setup with passport and Google
passport.use(new GoogleStrategy(
  GOOGLE_CONFIG, 
  (accessToken, refreshToken, profile, cb) => {
    
    // save the user right here to a database if you want
    const user = { 
      name: profile.displayName,
      photo: profile.photos[0].value.replace(/sz=50/gi, 'sz=250')
    }
    cb(null, user)
  })
)

// Middleware that triggers the PassportJS authentication process
const twitterAuth = passport.authenticate('twitter')
const googleAuth = passport.authenticate('google', { scope: ['profile'] })

// This custom middleware picks off the socket id (that was put on req.query)
// and stores it in the session so we can send back the right info to the 
// right socket
const addSocketIdToSession = (req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
}

// This is endpoint triggered by the popup on the client which starts the whole
// authentication process
app.get('/twitter', addSocketIdToSession, twitterAuth)
app.get('/google', addSocketIdToSession, googleAuth)

// This is the endpoint that Twitter sends the user information to. 
// The twitterAuth middleware attaches the user to req.user and then
// the user info is sent to the client via the socket id that is in the 
// session. 
app.get('/twitter/callback', twitterAuth, (req, res) => {
  io.in(req.session.socketId).emit('twitter', req.user)
  res.end()
})

// This is the endpoint that Google sends the user information to. 
// The googleAuth middleware attaches the user to req.user and then
// the user info is sent to the client via the socket id that is in the 
// session. 
app.get('/google/callback', googleAuth, (req, res) => {
  io.in(req.session.socketId).emit('google', req.user)
  res.end()
})
*/

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(PORT, () => {
  console.log('listening...')
})