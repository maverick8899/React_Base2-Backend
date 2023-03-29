const jwt = require("jsonwebtoken");
const Account = require("../model/accountModel");

//CLient Login
class AccountValidator {
  // POST /users/login .nếu get sẽ lộ sự liệu. event submit login
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    Account.findOne({ email, password })
      .then((data) => {
        if (data) {
          // console.log(email, password);
          //encode, expired: 10s
          const access_token = jwt.sign({ id: data._id }, "password", {
            expiresIn: 10, //second
          });
          res.json({ message: "successfully", access_token });
        } else {
          res.json({ message: "Failed" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json("error");
      });
  }
}

//verify
const checkLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log("ENCODE", token);

    const decode = jwt.verify(token, "password");

    console.log("DECODE", decode);

    const data = await Account.findOne({ _id: decode.id });
    if (data) {
      //truyền dữ liệu từ middleware này sang middleware khác,lưu trữ nó vào req
      req.data = data;
      next();
    } else {
      res.send("Failed Get Data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed Token");
  }
};

//khi qua cổng Login thì đều có quyền truy cập. User Manager Admin
class Task {
  CheckRole(req, res, next) {
    const role = req.data.role;
    role === "user" || role === "manager" || role === "admin"
      ? next()
      : res.json("NOT PERMISSION");
  }
  welcome(req, res, next) {
    console.log(req.data);

    res.json("Task");
  }
}
//manager List User
class Manager {
  CheckRole(req, res, next) {
    const role = req.data.role;
    role === "manager" || role === "admin"
      ? next()
      : res.json("NOT PERMISSION");
  }
  welcome(req, res) {
    res.json("Manager");
  }
}
// Người quản lý cả trang web
class Admin {
  CheckRole(req, res, next) {
    const role = req.data.role;
    role === "admin" ? next() : res.json("NOT PERMISSION");
  }
  welcome(req, res) {
    res.json("Admin");
  }
}

module.exports = {
  AccountValidator: new AccountValidator(),
  checkLogin,
  Task: new Task(),
  Admin: new Admin(),
  Manager: new Manager(),
};
