const express = require("express");
const router = express.Router();

const userController = require("./controllers/userController")
router.post("/register", userController.Register)
router.post("/login", userController.Login)
router.get("/user", userController.GetUser)
router.get("/logout", userController.LogOut)

router.get('/', function(req, res, next) {
  res.send('Server is active!');
});

module.exports = router;