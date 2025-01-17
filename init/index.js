const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust"

main()
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}


    const initDB =  async () => {
        await listing.deleteMany({});
        initData.data = initData.data
             .map((obj) => 
             ({...obj, 
                owner:"677695ac725958da9515c1bc",
                category: "Other"
            }))
        await listing.insertMany(initData.data);
         console.log("data was initialized");
     }
 

initDB();