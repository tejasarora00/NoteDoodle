const User = require("../Models/user.js");

module.exports.renderSignUpform = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", `Welcome to NoteDoodle @${username}`);
            res.redirect("/notes");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    let { username } = req.body;
    req.flash("success", `Welcome Back to NoteDoodle @${username}`);
    res.redirect("/notes");
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You logged out successfully!");
        res.redirect("/notes");
    })
};