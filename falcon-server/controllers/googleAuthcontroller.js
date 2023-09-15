const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const knex = require("../knex-db/knex");
const { json } = require("express");

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: "https://falcon-server-jaek.onrender.com/oauth/google/callback",
    scope: ["email", "profile"]
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if the user already exists in your database based on the Google ID or any unique identifier
      const existingUser = await knex('users').where("google_id" ,profile.id).first();

      if (existingUser) {
        // User already exists, no need to create a new record
        console.log({message: "User already exist", existingUser})
        return done(null, existingUser);
      } else {
        // User does not exist, create a new record
        const newUser = {
          google_id: profile.id,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          image: profile.photos[0].value, 
          authType: profile.provider
        };

        // Insert the new user into your database
        const [userId] = await knex('users').insert(newUser);

        // Set the user ID in the profile for serialization
        profile.user_id = userId;

        return done(null, profile);
      }
    } 
    catch (error) {
      console.log(error)
      return done(error);
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user);
  return json(user)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await knex('Merchants').where('google_id', id).first();
    if(user) {
      console.log(user)
      done(null, user);
      return json(user)
    }
    else{
      done(new Error("User not found"))
    }
  }
  catch (error) {
    console.log(error)
    done(error);
  }
});


module.exports = passport;