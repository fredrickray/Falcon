const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      //   scope: ['email', 'profile'],
    },
    (accessToken, refreshToken, profile, callback) => {
      console.log('Here is executed');
      callback(null, profile);
      console.log(profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
  console.log(user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// module.exports = { passport, GoogleStrategy }
