const express = require("express");
const userController = require("../app/controller/userController");
const authorization = require("../app/controller/authorizationController");
const router = express.Router();

//authentication
router.post("/login", authorization.AccountValidator.login);
//authorization
router.get(
  "/task",
  authorization.checkLogin,
  authorization.Task.CheckRole,
  authorization.Task.welcome
);
router.get(
  "/manager",
  authorization.checkLogin,
  authorization.Manager.CheckRole,
  authorization.Manager.welcome
);
router.get(
  "/admin",
  authorization.checkLogin,
  authorization.Admin.CheckRole,
  authorization.Admin.welcome
);
//CRUD
router.delete("/:id/delete", userController.delete);
router.put("/:id/update", userController.update);
router.get("/paginate", userController.paginate);
router.post("/store", userController.store);
router.get("/", userController.index);

module.exports = router;
