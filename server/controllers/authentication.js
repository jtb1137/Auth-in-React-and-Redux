const jwt = require("jwt-simple");
const Users = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has email and password authenticated, just need token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide an email and a password." });
  }

  Users.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use." });
      // 422 - unprocessable entity
    }

    const user = new Users({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) {
        return next(err);
      }
    });

    res.json({ token: tokenForUser(user) });
  });
};
