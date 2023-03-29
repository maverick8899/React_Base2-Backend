const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true } //auto add createdAt, updatedAt
);
//khai báo model với instance of Schema
module.exports = mongoose.model("Account", Account);
