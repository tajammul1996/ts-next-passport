import passport from "passport";
import { Strategy } from "passport-github2";
import cors from "cors";
import express from "express";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.WEBUI_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  session({
    name: "session-test",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
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
