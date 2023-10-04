const express = require("express");
const router = express.Router();

const authorizationController = require("../controllers/authorizationControllers")

//Home Page route
router.get("/", (req, res) => {
    res.render("index", {
        user: req.user,
        layout: "index"
    
    })
})

//Authorization routes
router.get("/login", authorizationController.login_get)
router.post("/login", authorizationController.login_post)

router.get("/logout", authorizationController.logout)

router.get("/signup", authorizationController.signup_get)
router.post("/signup", authorizationController.signup_post)


module.exports = router;