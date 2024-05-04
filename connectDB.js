const mongoose = require('mongoose');

module.exports = async function connectDB() {
  try {
    mongoose.set("debug", true);
    await mongoose.connect(
      "mongodb+srv://ortizmichel390:Larissa2015@cluster0.viztkjm.mongodb.net/Clients-Numbers?retryWrites=true&w=majority"
    );
    console.log(">>> DB is connected<<<");
    console.log("server on port", 3000);
  } catch (error) {
    console.log(error);
  }
};
