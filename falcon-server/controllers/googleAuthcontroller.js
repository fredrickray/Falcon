const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const knex  = require("../knex-db/knex")

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["email", "profile"],
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            // Check if the user exists in the database based on the Google ID
            const user = await knex('GoogleLogin').where('google_id', profile.id).first();
            console.log(user)
            if (user) {
              // User already exists in the database
              done(null, user);
            } else {
              // User does not exist, save the profile in the database
              const newUser = {
                google_id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName
                // Add other profile properties as needed
              };
    
              // const [userId] = await knex('user_profiles').insert(newUser);
              // newUser.id = userId;
              console.log(user)
    
              done(null, newUser);
            }
          } 
          catch (error) {
            console.log(error)
            done(error);
          }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
    console.log(user)
    console.log(user.name.givenName)
    console.log(user.name.familyName)
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await knex('GoogleLogin').where('id', id).first();
      console.log(user)
      done(null, user);
    } 
    catch (error) {
        console.log(error)
      done(error);
    }
  });


 module.exports = passport; 