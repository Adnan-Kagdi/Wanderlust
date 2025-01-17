const User = require("../models/user.js"); 


module.exports.renderSignUpForm = (req, res) => {
    res.render("./users/signUp");
} 

module.exports.doSignUp = async(req, res) => {
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
   
}

module.exports.renderloginForm = (req, res) => {
    res.render("./users/login")
}

module.exports.doLogin = async(req, res) => {
    req.flash("success", `Welcome back to wandelust ${req.body.username}!`);
    let redirectUrl = res.locals.redirectUrl || "/listing"
    res.redirect(redirectUrl)
}

module.exports.doLogout = (req, res) => {
    req.logout((err) => {
        if(err){
        return next(err);
        }
    req.flash("success", "you are logged out!");
    res.redirect("/listing");
    })  
}