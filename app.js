require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js") 

const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const categoryRouter = require("./routes/category.js")


// const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust"
const dbURL = process.env.ATLASDB_URL

const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err)
})

const sessionOptions = {
    store,
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}


main()
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
}) 

async function main(){ 
    await mongoose.connect(dbURL);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.use("/listing", listingsRouter);
app.use("/listing/:id/reviews", reviewsRouter );
app.use("/", userRouter);
app.use("/", categoryRouter);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found!"))
})

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", {message})
})

app.use((err, req, res, next) => {
    res.send("something went wrong!");
})

app.listen(8080, () => {
    console.log("server is listening on port 8080");
})
