const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/register",userController.createUser);
router.post("/login",userController.loginUser);
router.post("/logout",userController.logoutUser);

module.exports = router;

