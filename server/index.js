import passport from "passport";
import { Strategy } from "passport-github2";
import cors from "cors";
import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cookieSession from "cookie-session";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.WEBUI_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// var cookieSession = require("cookie-session");
app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "__session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 100,
    secure: true,
    httpOnly: true,
    sameSite: "none",
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/github/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

app.get("/api/auth/github", passport.authenticate("github", { scope: [] }));

app.get(
  "/api/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: `${process.env.WEBUI_URL}/dashboard`,
    failureRedirect: `${process.env.WEBUI_URL}/login`,
  })
);

app.get("/api/auth/logout", (req, res) => {
  req.logout();
  res.redirect(`${process.env.WEBUI_URL}/login`);
});

app.get("/api/auth/user", (req, res) => {
  console.log(req.user);
  return res.status(200).json(req.user);
});

app.listen(3004, () => {
  console.log("Server is running on port 3004");
});
