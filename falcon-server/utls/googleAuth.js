const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["email", "profile"]
    }, (accessToken, refreshToken, profile, callback) => {
        callback(null, profile )
        // console.log(profile)
    })
)

passport.serializeUser((user, done) => {
    done(null, user)
    console.log(user.name.givenName)
    console.log(user.name.familyName)
    // console.log(user.email.value)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})


// module.exports = { passport, GoogleStrategy }