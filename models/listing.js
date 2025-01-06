const mongoose = require("mongoose");
const Schema = mongoose.Schema;

main()
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=61%22",
        set: (v) => v === ""
        ? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=61%22"
        : v,
    },
    price:Number,
    location:String,
    country:String,

    reviews: [
        {
        type: Schema.Types.ObjectId,
        ref: "reviews"
        },
    ],
    
    owner: 
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    
    
})

const listing = mongoose.model("listing", listingSchema)

module.exports = listing;