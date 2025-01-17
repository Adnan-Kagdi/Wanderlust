const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner,validateListing } = require("../middelwares.js");
const User = require("../models/user.js");
const listingController = require("../controller/listing.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })


router
   .route("/")
   .get(validateListing, wrapAsync(listingController.index))
   .post( 
   isLoggedIn,
   upload.single("listing[image]"),
   validateListing,
   wrapAsync(listingController.createListing)
)

//Create Route
router.get("/new", isLoggedIn, validateListing, wrapAsync(listingController.renderNewForm))
 
router
    .route("/:id")
    .get(validateListing, wrapAsync(listingController.showList) )
    .put(
         isLoggedIn,
         isOwner,
         upload.single("listing[image]"),
         validateListing,
         wrapAsync(listingController.editListing)
    )
    .delete(
        isLoggedIn, 
        isOwner,
        validateListing, 
        wrapAsync(listingController.destroyListing)
    )

//Edit Route
router.get(
    "/:id/edit",
     isLoggedIn,
     isOwner,
     validateListing,
     wrapAsync(listingController.renderEditForm)
)


module.exports = router;  