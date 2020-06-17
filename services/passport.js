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
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true, //google'ın proxy'e guvenmesi için.
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        //halihazırda böyle bir kullanıcı var
        return done(null, existingUser); //1.error 2.modelinstance
      }

      // yeni kullanıcı yarat.
      const user = await new User({
        googleId: profile.id,
        displayName: profile.displayName,
        pictureUrl: profile._json.picture,
      }).save();
      done(null, user);
    }
  )
);
