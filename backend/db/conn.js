const mongoose = require("mongoose");
const url = "mongodb://localhost/vpn-test";

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

module.exports = { connection }
