const mongoose = require("mongoose");
const url =
  "mongodb+srv://root:8SSOLVFRdRlNuO09@cluster0.6b6zh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url);

const connection = () => {
  mongoose.connection
    .once("open", () => {
      console.log(`connected to mongodb successfully`);
    })
    .on("error", (error) => {
      console.log(error);
    });
};

module.exports = { connection };
