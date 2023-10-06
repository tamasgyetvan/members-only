const { body, validationResult } = require("express-validator");
const User = require("../models/user")
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")
const passport = require('passport')

exports.login_get = asyncHandler(async (req, res, next) => {
    res.render("login", {
        layout: "login"
    })
});

exports.login_post = passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true
})
    




    
exports.logout = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect("/")
    })
});
exports.signup_get = asyncHandler(async (req, res, next) => {
    res.render("signup", {
        layout: "signup"
    });
});
exports.signup_post = [
        body("username")
            .isLength({min: 5, max: 25})
            .withMessage("Username length should be within 5-25 characters!")
            .trim()
            .escape(),            
        body("password", "Password is required!")
            .notEmpty()
            .trim()
            .escape(),

        body("confirmPassword")
            .custom((value, {req}) => value === req.body.password)
            .withMessage("Password mismatch!"),   

        body("firstname", "First name is required!")
            .notEmpty()
            .trim()
            .escape(),

        body("lastname", "Last name is required!")
            .notEmpty()
            .trim()
            .escape(),

        asyncHandler(async(req, res, next) => {
            
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                const errors = validationResult(req)
                const user = new User({
                username: req.body.username,
                password: hashedPassword,
                firstname: req.body.firstname,
                lastname: req.body.lastname
                })
             
                if (!errors.isEmpty()) {
                    res.render("signup", {
                        layout: "signup",
                        errors: errors.array(),
                        user: user
                    })
                    return;
                } else {                    
                    await user.save()
                    res.redirect("/")            
                }              
              });           
        })
]









