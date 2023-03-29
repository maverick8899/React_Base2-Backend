const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const User = new Schema(
  {
    password: { type: String },
    role: { type: String },
    userImage: { type: String },
    username: { type: String },
    email: { type: String },
    id: { type: Number },
  },
  { timestamps: true } //auto add createdAt, updatedAt
);
//khởi tạo giá trị id tự tăng, bắt đầu từ 1; cứ thêm 1 giá trị i++
User.plugin(AutoIncrement, { inc_field: "id", start_seq: 0 });

//khai báo model với instance of Schema
module.exports = mongoose.model("User", User);
