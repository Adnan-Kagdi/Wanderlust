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

const reviewsSchema = new Schema({
    rating:{
        type:Number,
        min: 1,
        max: 5
    },

    comments: {
        type:String,
        required:true
    }, 

    createdAt: {
        type:Date,
        default: Date.now()
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

});

const reviews = mongoose.model("reviews", reviewsSchema);

module.exports = reviews;