const mongoose = require("mongoose");


mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.wrgbdu1.mongodb.net/groupomonia`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      //useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("failed To Connect To MongoDB", err));
