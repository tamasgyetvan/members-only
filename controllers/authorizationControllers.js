const asyncHandler = require("express-async-handler");

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
    res.send("NOT IMPLEMENTED: Signup get request");
});
exports.signup_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Signup post request");
});
