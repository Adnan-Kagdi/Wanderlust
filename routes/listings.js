const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner,validateListing } = require("../middelwares.js");
const User = require("../models/user.js");
const listingController = require("../controller/listing.js")


router.get("/", validateListing, wrapAsync(listingController.index))

//Create Route
router.get("/new", isLoggedIn, validateListing, wrapAsync(listingController.renderNewForm))

router.post("/", 
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
)



//Show Route
router.get("/:id", validateListing, wrapAsync(listingController.showList) )


//Edit Route
router.get(
    "/:id/edit",
     isLoggedIn,
     isOwner,
     validateListing,
     wrapAsync(listingController.renderEditForm)
)

//Update Route
router.put(
    "/:id",
     isLoggedIn,
     isOwner,
     validateListing,
     wrapAsync(listingController.editListing)
)

//Destroy Route
router.delete(
    "/:id", 
    isLoggedIn, 
    isOwner,
    validateListing, 
    wrapAsync(listingController.destroyListing)
)

module.exports = router; 