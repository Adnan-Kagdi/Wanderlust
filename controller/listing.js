const listing = require("../models/listing.js")


module.exports.index =  async (req,res) => {
    const lists =  await listing.find();
    res.render("./Listings/index.ejs", {lists});
}


module.exports.renderNewForm =  async (req,res) => {
    res.render("./Listings/new.ejs")
}


module.exports.createListing = async (req, res, next) => {
    let newList = new listing(req.body.listing);
    newList.owner = req.user._id

     await newList.save()
     .then((res) => {
       console.log(res);
     });

     req.flash("success", "your new listing was created!");
     res.redirect("/listing")
     }
 

module.exports.showList = async (req,res) => {
    const {id} = req.params;
   let listings = await listing
   .findById(id)
   .populate({
       path: "reviews",
     populate: {
       path: "author"
   },
   })
   .populate("owner");

   if(!listings){
       req.flash("error", "listing you requested for does not exist!");
       res.redirect("/listing");
   }
   res.render("./Listings/show.ejs",{id,listings});
}     


module.exports.renderEditForm =  async (req,res) => {
    let {id} = req.params
    let editList = await listing.findById(id)
    if(!editList){
        req.flash("error", "listing you requested for does not exist!");
        res.redirect("/listing");
    }
    res.render("./Listings/edit.ejs", {edit:editList} )

}


module.exports.editListing = async (req,res) => {
    let {id} = req.params
    let updated =  await listing.findByIdAndUpdate(id, {...req.body.listing})

    if(!req.body.listing){
        next(new ExpressError(400, "send valid data for listing!"))
     }

     await updated.save()
    .then((res) => {
        console.log(res);
    })
    req.flash("success", "edited successfully!");
    res.redirect(`/listing/${id}`)
}


module.exports.destroyListing =  async (req,res) => {
    let {id} = req.params
    let result =  await listing.findByIdAndDelete(id);
    let title = result.title; 
    req.flash("success", `Listing deleted successfully!`);
    res.redirect("/listing")
}