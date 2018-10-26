const Users = require("../models/user");

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide an email and a password." });
  }
  // See if user with the given email exists
  Users.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    // If user does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use." });
      // 422 - unprocessable entity
    }

    // If user does not exist, create and save user record
    const user = new Users({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) {
        return next(err);
      }
    });

    // Respond to request indicating the user was created
    res.json({ success: true });
  });
};
