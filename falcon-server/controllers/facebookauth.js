const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy

passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    async(accessToken, refreshToken, profile, cb) => {
        try{
            // console.log(profile)
            return cb(null, profile)
        } catch(error) {
            return cb(error)
        }
    })
)