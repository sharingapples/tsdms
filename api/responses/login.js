module.exports = function login(inputs) {
  var req = this.req;
  var res = this.res;
  
  User.attemptLogin({
    username: inputs.username,
    password: inputs.password
  }, function(err, user) {
    if (err) return res.negotiate(err);

    if (!user) { // Login attempt failed
      if (req.wantsJSON) {
        return res.badRequest('Invalid username/password');
      }

      // Show the login view with the message and the provided username/password
      return res.view('auth/login', {
        message: "Invalid username/password",
        username: inputs.username
      });
    }

    // Login was successful
    req.session.me = user.id;

    if (req.wantsJSON || !inputs.successRedirect) {
      return res.ok();
    }

    return res.redirect(inputs.successRedirect);
  });
}
