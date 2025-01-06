const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReviews, isLoggedIn, isReviewAuthor} = require("../middelwares");
const { putReview, destroyComment } = require("../controller/reviews.js");


//Comment(Post) Route
router.post(
    "/",
    isLoggedIn, 
    validateReviews, 
    wrapAsync(putReview)
)

 //Delete(Review) Route
 router.delete(
    "/:reviewsId",
    isLoggedIn, 
    isReviewAuthor,
    wrapAsync(destroyComment)
);


 module.exports = router;