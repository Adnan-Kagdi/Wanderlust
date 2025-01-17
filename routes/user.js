const express = require("express")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middelwares.js");
const userController = require("../controller/user.js")


router
   .route("/signUp")
   .get(userController.renderSignUpForm )
   .post(wrapAsync(userController.doSignUp))

router
   .route("/login")
   .get(userController.renderloginForm )
   .post(
    saveRedirectUrl,
    passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash: true
    }) ,
    userController.doLogin
)

router.get("/logout", userController.doLogout )

module.exports = router;