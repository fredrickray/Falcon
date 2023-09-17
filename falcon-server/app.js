const express = require ("express");
const authR = require("./routes/authRoute")
const adminR = require("./routes/adminRoute")
const storeR = require("./routes/storeRoute")
const customerRoute = require("./routes/customerRoute")
const payRoute = require("./routes/paymentRoute")
const openaiR = require("./routes/openaiRoute")
require("dotenv").config()
const session = require("express-session")
const passport = require("passport")
const OauthRoute = require("./routes/googleRoute")
const port  = process.env.PORT || 9000
const server = process.env.SERVER
const app = express()
const cors = require("cors")
const cron = require('node-cron');

app.use(cors())
app.use(cors({
    origin: ["https://falcon-app.vercel.app", "https://falcon-admin.vercel.app"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["X-Requested-With", "Content-Type"]
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(
    session({
        secret: 'your_session_secret',
        resave: false,
        saveUninitialized: false
    })
)

// Middleware to handle preflight requests
const handlePreflight = (req, res, next) => {
    // Set the CORS headers for the preflight request
    res.setHeader("Access-Control-Allow-Origin", ["https://falcon-app.vercel.app", "http://localhost:3000", "http://localhost:3002", "https://falcon-admin.vercel.app"]);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  
    // Respond to the OPTIONS request with a 204 No Content status
    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }
  
    // Pass the request to the next middleware
    next();
};


app.use(handlePreflight)
// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/oauth", OauthRoute)
app.use("/auth", authR)
app.use("/admin", adminR)
app.use("/store", storeR)
app.use("/stores", customerRoute)
app.use("/payment", payRoute)
app.use("/openai", openaiR)
// app.get("/auth", authR)

// cron.schedule('*/5 * * * * *', () => {
//     console.log('running a task every 5 seconds');
// });

app.get("/", (req, res) => {
    res.send("Server is live and running")
})

app.listen(port, () => {
    // console.log(`Server is running on port http://localhost:${port}`)
    console.log(`Server is running on ${server}`)
})


// module.exports = app