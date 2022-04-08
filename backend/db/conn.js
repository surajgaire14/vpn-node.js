const mongoose = require("mongoose");
require("dotenv").config({path:"/home/suraj/Desktop/vpn-node.js/.env"})

const connection = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB Connected =>")
  })
  .catch(err => {
    console.log(err.message)
  })
};

module.exports = { connection };
