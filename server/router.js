const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
// By default, passport wants to create a cookie-based session
const requireSignin = passport.authenticate("local", { sessions: false });

module.exports = function(app) {
  app.get("/", requireAuth, function(req, res) {
    res.send({ hi: "there" });
  });
  app.post("/signin", Authentication.signin);
  app.post("/signup", Authentication.signup);
};
