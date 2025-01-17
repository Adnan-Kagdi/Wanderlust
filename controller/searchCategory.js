const listing = require("../models/listing.js")


module.exports.searchResult = async(req, res, next) => {
    const q = req.query.q?.toLowerCase();
    let lists;
switch(q){

    case "canada":
       lists = await listing.find({country:"Canada"}).populate("owner");
    break;

    case "italy" :
       lists = await listing.find({country:"Italy"}).populate("owner");
    break;  

    case "tanzania" :
       lists = await listing.find({country:"Tanzania"}).populate("owner");
    break; 

    case "india" :
      lists = await listing.find({country:"india"}).populate("owner");
   break;

    case "united kingdom" :
       lists = await listing.find({country:"United Kingdom"}).populate("owner");
    break;       

    case "usa" :
       lists = await listing.find({country:"United States"}).populate("owner");
    break;

    case "japan" :
       lists = await listing.find({country:"Japan"}).populate("owner");
    break;  

    case "maldives" :
       lists = await listing.find({country:"Maldives"}).populate("owner");
    break;  

    case "dubai" :
       lists = await listing.find({location:"Dubai"}).populate("owner");
    break;

    case "thailand" :
       lists = await listing.find({country:"Thailand"}).populate("owner");
    break;

    case "" :
       res.redirect("/listing")
    break;

    default:
        res.render("./Listings/notFound");
      

        
}

if(lists.length){
    res.render("./Listings/index", { lists });
} else{
    res.render("./Listings/notFound");
}

}
