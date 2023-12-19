

const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const knex = require("../knex-db/knex");
const { json } = require("express");
const { createToken, maxAge } = require("../middlewares/createToken")

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ["email", "profile"]
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if the user already exists in your database based on the Google ID or any unique identifier
      const existingUser = await knex('users').where("google_id", profile.id).first();

      if (existingUser) {
        // User already exists, no need to create a new record
        console.log({ message: "User already exist", existingUser })
        // console.log("accesToken: ",accessToken)
        // console.log("refreshToken: ",refreshToken)
        // console.log(done)
        return done(null, existingUser);
      } else {
        const existingEmail = await knex('users').where("email", profile.emails[0].value).first();
        if (existingEmail) {
         await knex("users").where("email", profile.emails[0].value).update({google_id: profile.id})
          profile.user_id = existingEmail.id;
          console.log("Existing email id: " + existingEmail.id)

          return done(null, profile);
        }
        else {
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
          console.log(userId)

          return done(null, profile);
        }

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
    if (user) {
      console.log(user)
      done(null, user);
      return json(user)
    }
    else {
      done(new Error("User not found"))
    }
  }
  catch (error) {
    console.log(error)
    done(error);
  }
});

const oauth = async (req, res) => {
  // return res.json({message: "hello"})
  try {
    const { user } = req
    console.log("This is the user: ", user)
    const token = createToken(user.id);
    return res.status(200).json({
      status: 'success',
      data: user,
      message: 'Logged in successfully',
      token,
    });
    // console.log("Reached!!")
  } catch (error) {
    console.log(error)
  }
}

module.exports = {passport, oauth};


//  try {
//     // Check if the user exists in the database based on the Google ID
//     const user = await knex('GoogleLogin').where('google_id', profile.id).first();
//     console.log(user)
//     if (user) {
//       // User already exists in the database
//       done(null, user);
//     } else {
//       // User does not exist, save the profile in the database
//       const newUser = {
//         google_id: profile.id,
//         email: profile.emails[0].value,
//         name: profile.displayName
//         // Add other profile properties as needed
//       };

//       // const [userId] = await knex('user_profiles').insert(newUser);
//       // newUser.id = userId;
//       console.log(user)

//       done(null, newUser);
//     }
//   }
//   catch (error) {
//     console.log(error)
//     done(error);
//   }