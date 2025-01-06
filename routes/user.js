const express = require("express")
const router = express.Router();
const User = require("../models/user.js"); 
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middelwares.js");

router.get("/signUp", (req, res) => {
    res.render("./users/signUp");
})

router.post("/signUp", wrapAsync(async(req, res) => {
    try{
        let {username, email, password} = req.body
        const newUser = new User({username, email});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wandelust!");
            res.redirect("/listing");
        })
        
    } catch(e){
    req.flash("error", e.message);
    res.redirect("/signUp")
    }
   
}))
 
router.get("/login", (req, res) => {
    res.render("./users/login")
})

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash: true
    }) ,
     async(req, res) => {
    req.flash("success", `Welcome back to wandelust ${req.body.username}!`);
    let redirectUrl = res.locals.redirectUrl || "/listing"
    res.redirect(redirectUrl)
})

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if(err){
        return next(err);
        }
    req.flash("success", "you are logged out!");
    res.redirect("/listing");
    })  
})

module.exports = router;