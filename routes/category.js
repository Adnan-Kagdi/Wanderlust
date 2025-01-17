const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const categoryController = require("../controller/categories.js");
const searchCategory = require("../controller/searchCategory.js")


//Select Category Route

router.get(
    "/Trending", 
    wrapAsync(categoryController.renderTrendingLists)
)

router.get(
    "/Rooms", 
    wrapAsync(categoryController.renderRoomsLists)
)

router.get(
    "/Iconic-Cities", 
    wrapAsync(categoryController.renderInCitiesLists)
)

router.get(
    "/Mountains", 
    wrapAsync(categoryController.renderMountainsLists)
)

router.get(
    "/Castles", 
    wrapAsync(categoryController.renderCastlesLists)
)

router.get(
    "/Amazing-Pools", 
    wrapAsync(categoryController.renderAmazePoolsLists)
)

router.get(
    "/Camping", 
    wrapAsync(categoryController.renderCampingLists)
)

router.get(
    "/Farms", 
    wrapAsync(categoryController.renderFarmsLists)
)

router.get(
    "/Arctic", 
    wrapAsync(categoryController.renderArcticLists)
)

router.get(
    "/Domes", 
    wrapAsync(categoryController.renderDomesLists)
)

router.get(
    "/Boats", 
    wrapAsync(categoryController.renderBoatsLists)
)


//Search Category Route
router.get("/search", wrapAsync(searchCategory.searchResult))


module.exports = router