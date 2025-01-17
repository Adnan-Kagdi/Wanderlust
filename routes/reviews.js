const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReviews, isLoggedIn, isReviewAuthor} = require("../middelwares");
const reviewsController = require("../controller/reviews.js")


//Comment(Post) Route
router.post(
    "/",
    isLoggedIn, 
    validateReviews, 
    wrapAsync(reviewsController.putReview)
)

 //Delete(Review) Route
 router.delete(
    "/:reviewsId",
    isLoggedIn, 
    isReviewAuthor,
    wrapAsync(reviewsController.destroyComment)
);


 module.exports = router;