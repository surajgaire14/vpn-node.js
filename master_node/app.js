const app = require("express")();
const mongoose = require("mongoose");
app.use(require("cors")());
/**
 * @dev MongoDB connection with Mongoose Package
 */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected => GaireVPN...");
  })
  .catch((err) => {
    if (err) throw err;
  });

module.exports = app;
