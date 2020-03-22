const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout(); // bu bir passport ozelligi, otomatik olarak user'ın cookie'sini siliyor.
    res.send(req.user);
  });

  app.get("/api/currentUser", (req, res) => {
    res.send(req.user);
  });
};
