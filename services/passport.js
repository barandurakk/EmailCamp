const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  //user parametresi passport.use callback fonksiyonunda done ile yolladıgımız user'ı kullanıyor.
  done(null, user.id); //user.id mongoDB nin user'a atadıgı unique Id.
});

passport.deserializeUser((id, done) => {
  //id serialize'dan atadıgımız user.id buradaki id parametresine denk geliyor.
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          //halihazırda böyle bir kullanıcı var
          done(null, user); //1.error 2.modelinstance
        } else {
          // yeni kullanıcı yarat.
          new User({
            googleId: profile.id
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);
