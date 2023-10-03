const { body, validationResult } = require("express-validator");
const User = require("../models/user")
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")

exports.login_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Login Get reques");
});
exports.login_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Login Post request");
});
exports.logout = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Logout");
});
exports.signup_get = asyncHandler(async (req, res, next) => {
    res.render("signup");
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









