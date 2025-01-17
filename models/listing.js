const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// main()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
// }

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,

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

    category:
    {
        type: String,
        enum: ["Boats", "Domes", "Arctic", "Farms", "Camping", "Amazing-Pools", "Castles", "Mountains", "Iconic-Cities", "Rooms", "Trending", "Other"]
    },

    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

})

const listing = mongoose.model("listing", listingSchema)

module.exports = listing;