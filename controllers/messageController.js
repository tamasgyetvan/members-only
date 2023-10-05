const { body, validationResult } = require("express-validator");
const Message = require("../models/message")
const asyncHandler = require("express-async-handler");

exports.create_message_get = asyncHandler(async (req, res, next) => {
    res.render("create_message", {
        user: req.user,
        layout: "createmessage"
    })
});

exports.create_message_post = [
    body("title")
        .notEmpty()
        .withMessage("Title is required!")
        .isLength({max: 50})
        .withMessage("Title can only contain 50 characters!")
        .trim()
        .escape(),
    body("message")
        .notEmpty()
        .withMessage("Message is required!")
        .isLength({ max: 100})
        .withMessage("Message can only contain 100 characters!")
        .trim()
        .escape(),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req)
        const message = new Message({
            title: req.body.title,
            message: req.body.message,
            user: req.user.id,
        })

        if (!errors.isEmpty()) {
            res.render("create_message", {
                errors: errors.array(),
                message: message,
                layout: "create_message"

            })
            return;
        } else {
            await message.save()
            res.redirect("/home")
        }

    })
]

exports.delete_message_post = asyncHandler(async (req, res, next) => {
    await Message.findByIdAndRemove(req.params.messageId)
    res.redirect("/home")
});