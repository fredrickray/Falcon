const router = require("express").Router()
const passport = require("passport")



// Route for initiating the Google OAuth authentication
router
.get('/google', passport.authenticate('google',  ['profile', 'email']));


// Route for handling the callback URL after successful authentication
router.get('/google/callback', 
passport.authenticate('google', {
   successRedirect: "http://localhost:3000/Home",
   failureRedirect: '/login' }),
  // (req, res) => {
  //   // Redirect or handle successful authentication
  //   res.redirect('/Home');
  // }
);
// router.get("/google/callback",
// passport.authenticate("google", {
//     successRedirect: process.env.CLIENT_URL || "http://localhost:3000/Home",
//     failureRedirect: "/login/failed"
// }))  


// Route for accessing the authenticated user profile
router
.get('/profile', (req, res) => {
  if (req.user) {
    // User is authenticated, access the user profile from req.user
    res.send(req.user);
  } 
  else {
    // User is not authenticated, handle accordingly
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;
