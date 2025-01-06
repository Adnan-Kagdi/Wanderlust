const express = require("express");
const router = express.Router({mergeParams: true});
const listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const reviews = require("../models/reviews.js");
const {validateReviews, isLoggedIn, isReviewAuthor} = require("../middelwares");


//Comment(Post) Route
router.post(
    "/",
    isLoggedIn, 
    validateReviews, 
    wrapAsync(async(req, res) => {
    let {id} = req.params
    let listings = await listing.findById(req.params.id);
    let newReview = new reviews(req.body.reviews);
    newReview.author = req.user.id
    listings.reviews.push(newReview);
    console.log(newReview);

    console.log("Review Author ID:", review.author.id);
    console.log("Current User ID:", res.locals.currUser._id);
     

    await newReview.save()
    await listings.save() 
 
   console.log("review was saved");

   req.flash("success", "new review was created!");
   res.redirect(`/listing/${id}`);
 
 } ) )

 //Delete(Review) Route
 router.delete(
    "/:reviewsId",
    isLoggedIn, 
    isReviewAuthor,
    wrapAsync(async(req, res) => {
    let {id, reviewsId} = req.params

    await listing.findByIdAndUpdate(id, {$pull: {reviews : reviewsId}});
    await reviews.findByIdAndDelete(reviewsId);

    req.flash("success", "review deleted!");
    res.redirect(`/listing/${id}`);

 }));


 module.exports = router;