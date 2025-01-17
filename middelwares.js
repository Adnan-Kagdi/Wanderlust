const listing = require("./models/listing.js");
const reviews = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewsSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "you must logged in to create listing!");
        res.redirect("/login");
      }
      next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
    } 
    next();
  };

module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params
    let listings = await listing.findById(id);

    if(!listings.owner._id.equals(res.locals.currUser._id)){
    req.flash("error", "you don't have permission to edit!");
    return res.redirect(`/listing/${id}`)
    }
      next();
}

module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        console.log(error);
        throw new ExpressError(400, error.detail[0]?.message||"validation Error")
    } else {
        next();
    }     
}

module.exports.validateReviews = (req, res, next) => {
    let {error} = reviewsSchema.validate(req.body);
    if(error){
        console.log(error);
        throw new ExpressError(400, error.detail[0]?.message||"validation Error")
    } else {
        next();
    }
} 
  

module.exports.isReviewAuthor = async (req,res,next)=>{
    let { id,reviewsId } = req.params;
    let review = await reviews.findById(reviewsId);
    if(!review.author._id.equals(res.locals.currUser._id)){
     req.flash("error","You are not the author of this review");
    return res.redirect(`/listing/${id}`);
    }
    next();
  };