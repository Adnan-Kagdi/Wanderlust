const listing = require("../models/listing.js");

module.exports.renderTrendingLists = async(req, res) => {
    let lists = await listing.find({category:"Trending"}).populate("owner");
    if(lists.length){
        return res.render("./Listings/category",{lists})
     } 
       res.render("./Listings/notFound");
}

module.exports.renderRoomsLists = async(req, res) => {
    let lists = await listing.find({category:"Rooms"}).populate("owner")
    if(lists.length){
        return res.render("./Listings/category",{lists})
     } 
       res.render("./Listings/notFound");
}

module.exports.renderInCitiesLists = async(req, res) => {
    let lists = await listing.find({category:"Iconic-Cities"}).populate("owner")
    if(lists.length){
        return res.render("./Listings/category",{lists})
     } 
       res.render("./Listings/notFound");
}

module.exports.renderMountainsLists = async(req, res) => {
    let lists = await listing.find({category:"Mountains"}).populate("owner")
    if(lists.length){
        return res.render("./Listings/category",{lists})
     } 
       res.render("./Listings/notFound");
}

module.exports.renderCastlesLists = async(req, res) => {
    let lists = await listing.find({category:"Castles"}).populate("owner")
    if(lists.length){
       return res.render("./Listings/category",{lists})
    } 
      res.render("./Listings/notFound");
}

module.exports.renderAmazePoolsLists = async(req, res) => {
    let lists = await listing.find({category:"Amazing-Pools"}).populate("owner")
    if(lists.length){
        return res.render("./Listings/category",{lists})
     } 
       res.render("./Listings/notFound");
}

module.exports.renderCampingLists = async(req, res) => {
    let lists = await listing.find({category:"Camping"}).populate("owner")
    if(lists.length){
        return res.render("./Listings/category",{lists})
     } 
       res.render("./Listings/notFound");
}

module.exports.renderFarmsLists = async(req, res) => {
    let lists = await listing.find({category:"Farms"}).populate("owner")
    if(lists.length){
        return res.render("./Listings/category",{lists})
     } 
       res.render("./Listings/notFound");
}

module.exports.renderArcticLists = async(req, res) => {
    let lists = await listing.find({category:"Arctic"}).populate("owner")
    if(lists.length){
        return res.render("./Listings/category",{lists})
     } 
       res.render("./Listings/notFound");
}

module.exports.renderDomesLists = async(req, res) => {
    let lists = await listing.find({category:"Domes"}).populate("owner")
    if(lists.length){
        return res.render("./Listings/category",{lists})
     } 
       res.render("./Listings/notFound");
}

module.exports.renderBoatsLists = async(req, res) => {
    let lists = await listing.find({category:"Boats"}).populate("owner")
    if(lists.length){
        return res.render("./Listings/category",{lists})
     } 
       res.render("./Listings/notFound");
}
