const axios = require("axios");

const User = require("../model/userModel");

const PAGE_LIMIT = 10;
//map sẽ trả về các promise, khi map duyệt xong thì promiseAll sẽ thực hiện các promise đó một lúc
const handleAddUserToDB = async (arrData) => {
  try {
    const users = arrData.map((data) => {
      return {
        password: data.password,
        role: data.role,
        userImage: data.userImage,
        username: data.username,
        email: data.email,
        id: data.id,
      };
    });
    await User.insertMany(users);
  } catch (err) {
    console.error(err);
    throw new Error("An error occurred while adding data");
  }
};

class UserController {
  //GET /users/ Add data from MockAPI to mongoDB
  async index(req, res, next) {
    try {
      const response = await axios.get(
        "https://63f02165271439b7fe7ad2e9.mockapi.io/api/user/users"
      );
      await handleAddUserToDB(response.data);
      res.send("Add data successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while adding data");
    }
  }
  //GET /users/paginate
  async paginate(req, res, next) {
    let page = req.query.page;
    let perPage = req.query.per_page;

    const count = await User.countDocuments().exec();
    const pages = Math.ceil(count / perPage);
    //
    if (page) {
      //page <=0 sẽ lọt vào catch nên validate cho nó bằng 1, mặc định render page1
      page <= 0 && (page = 1);
      const amountPageSkip = (parseInt(page) - 1) * PAGE_LIMIT;
      User.find({})
        .sort({ id: 1 })
        .skip(amountPageSkip)
        .limit(perPage || PAGE_LIMIT)
        .then((users) =>
          res.json({
            data: {
              totalUsers: count,
              totalPages: pages,
              users: users,
            },
            EC: 0,
            EM: "successfully",
          })
        )
        .catch((err) => {
          res.json({
            data: {},
            EC: -1,
            EM: err.message,
          });
        });
    } else {
      User.find({})
        .sort({ id: 1 })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    }
  }
  //POST /users/store. Add user
  store(req, res, next) {
    const user = new User(req.body);
    user
      .save()
      .then(() => res.send("Post User is Successfully"))
      .catch((err) => res.send(err));
  }
  //PUT /users/update/:id
  update(req, res, next) {
    User.updateOne({ id: req.params.id }, req.body)
      .then(() => res.json(req.body))
      .catch((err) => res.send(err));
  }
  //DELETE /users/:id/update
  delete(req, res, next) {
    User.deleteOne({ id: req.params.id })
      .then(() => res.send("DELETE is successfully"))
      .catch((err) => res.send(err));
  }
}

module.exports = new UserController();
