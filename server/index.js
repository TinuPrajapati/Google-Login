require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const users = require("./model/usersModel.js");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.frontend_url,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("error:", err));

app.use(
  session({
    secret: "dkjhfsldghjsh",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.client_id,
      clientSecret: process.env.client_secret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await users.findOne({ googleid: profile.id });
        if (!user) {
          user = new users({
            googleid: profile.id,
            name: profile.displayName,
            email: profile.email,
            image: profile. picture,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await users.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.frontend_url}/show`,
    failureRedirect: `${process.env.frontend_url}/login`,
  })
);

app.get("/user",async (req,res)=>{
    if(req.user){
        res.status(200).json({
            msg:"User Login Successfully",
            userData:req.user
        })
    }else{
        res.status(400).json("User not login")
    }
})

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
