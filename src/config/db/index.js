const mongoose = require("mongoose");

mongoose.set("strictQuery", true); //bật chế độ kiểm tra,đọc zalo mongoDB

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Lofi_tiktok");
    console.log("connect succeeded");
  } catch (error) {
    console.log("connect failed");
  }
}

module.exports = { connect }; //đưa vào object để khi import rõ nghĩa hơn
