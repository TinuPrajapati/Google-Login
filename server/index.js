require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/usersModel");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("Connect Database successfully")
  } catch (error) {
    console.log("Cannot connect to database",error);
  }
}

connectDB();

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
        let user = await User.findOne({ google_id: profile.id });
        if (!user) {
          user = new User({
            google_id: profile.id,
            name: profile.displayName,
            email: profile.email,
            image: profile.picture,
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
    const user = await User.findById(id);
    console.log(user)
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
    successRedirect: `${process.env.frontend}/show`,
    failureRedirect: `${process.env.frontend}/login`,
  })
);

app.get("/user", async (req, res) => {
  console.log(req.user)
  if (req.user) {
    res.status(200).json({
      msg: "User Login Successfully",
      userData: req.user,
    });
  } else {
    res.status(400).json("User not login");
  }
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
