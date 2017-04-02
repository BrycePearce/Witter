//find out if user is authenticated
exports.IsAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else { next(new Error(401)); }
}

//log them out and destroy the express session
exports.destroySession = function (req, res, next) {
  req.logOut();
  req.session.destroy();
  //redirect home
  res.redirect("/");
}