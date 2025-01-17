const listing = require("../models/listing.js")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapToken = process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



module.exports.index = async (req, res) => {
    const lists = await listing.find().populate("owner");
    res.render("./Listings/index.ejs", { lists });
}

module.exports.renderNewForm = async (req, res) => {
    res.render("./Listings/new.ejs")
}


module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
        .send()

    let url = req.file.path
    let filename = req.file.filename
    let newList = new listing(req.body.listing);
    newList.owner = req.user._id
    newList.image = { url, filename };
    newList.geometry = response.body.features[0].geometry

    let list = await newList.save()
    console.log(list)

    req.flash("success", "your new listing was created!");
    res.redirect("/listing")
}


module.exports.showList = async (req, res) => {
    const { id } = req.params;
    let listings = await listing
        .findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            },
        })
        .populate("owner");

    if (!listings) {
        req.flash("error", "listing you requested for does not exist!");
        res.redirect("/listing");
    }
    res.render("./Listings/show.ejs", { id, listings });
}


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params
    let editList = await listing.findById(id)
    if (!editList) {
        req.flash("error", "listing you requested for does not exist!");
        res.redirect("/listing");
    }
    let originalImageUrl = editList.image.url
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_250/")
    res.render("./Listings/edit.ejs", { edit: editList, originalImageUrl })

}


module.exports.editListing = async (req, res) => {

    let { id } = req.params
    let updated = await listing.findByIdAndUpdate(id, { ...req.body.listing })

 

    if (typeof req.file !== "undefined") {
        let url = req.file.path
        let filename = req.file.filename
        updated.image = { url, filename }
        await updated.save()
    }

    req.flash("success", "edited successfully!");
    res.redirect(`/listing/${id}`)
}


module.exports.destroyListing = async (req, res) => {
    let { id } = req.params
    let result = await listing.findByIdAndDelete(id);
    let title = result.title;
    req.flash("success", `Listing deleted successfully!`);
    res.redirect("/listing")
}