var db = require('../models')

//render signup page when signUp route hit in express
exports.signUp = function (req, res) {
  res.render("signup.ejs");
}
//render signup page when signUp route hit in express
exports.register = function (req, res) {
  //take username defined in request, if they don't exist, create the user/pass provided by user.
  db.User.find({ where: { username: req.username } }).success(function (user) {
    if (!user) {
      db.User.create({ username: req.body.username, password: req.body.password }).error(function (err) {
        console.log(err);
      });
      //if there is a problem, redirect to signup
    } else {
      res.redirect('/signup')
    }
  })
  //if no issue, redirect back home
  res.redirect('/')
};