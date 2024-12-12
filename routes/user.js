const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../Models/user.js");
const passport = require("passport");

const usersController = require("../controllers/users.js");

router.route("/signup")
    .get(usersController.renderSignUpform)
    .post(wrapAsync(usersController.signUp));

router.route("/login")
    .get(usersController.renderLoginForm)
    .post(passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), usersController.login);

//Logout Route
router.get("/logout", usersController.logout);

module.exports = router;