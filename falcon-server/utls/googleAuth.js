const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy


passport.use(
    new GoogleStrategy({
        clientID: "661877860201-bqod5rubgb3iinuvcro36td5fnm7repo.apps.googleusercontent.com",
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "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",
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