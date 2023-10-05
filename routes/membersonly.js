const express = require("express");
const router = express.Router();
const Message = require("../models/message")
const authorizationController = require("../controllers/authorizationControllers")
const createMessageController = require("../controllers/createMessageController")

//Index Page route
router.get("/", (req, res) => {
    res.render("index", {
        user: req.user,
        layout: "index"
    
    })
})

router.get("/home", async (req, res) => {
    if (req.user === undefined) {
        res.redirect("/")
    } 
    const messages = await Message.find({}).populate("user").exec()
    console.log(messages)
    res.render("home", {
        user: req.user,
        layout: "home",
        messages: messages,
    })
})

router.get("/create_message", createMessageController.create_message_get)
router.post("/create_message", createMessageController.create_message_post)

//Authorization routes
router.get("/login", authorizationController.login_get)
router.post("/login", authorizationController.login_post)

router.get("/logout", authorizationController.logout)

router.get("/signup", authorizationController.signup_get)
router.post("/signup", authorizationController.signup_post)


module.exports = router;