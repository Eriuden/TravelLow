const mongoose = require("mongoose");

mongoose
    .connect('mongodb+srv://' + process.env.DB_USER_PASS + process.env.MONGODB_CLUSTER
    )
    .then(() => console.log("mongoDB nous recoit 5 sur 5"))
    .catch((err) => console.log("echec de connection à mongoDB",err))