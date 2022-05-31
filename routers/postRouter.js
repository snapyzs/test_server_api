const Router = require("express");
const router = new Router();
const postController = require("../controllers/postController");
const authCheck = require('../middleware/authCheck');


router.get("/all",postController.getAllPost);
router.post("/create",authCheck, postController.createPost);
router.post("/edit",authCheck, postController.editPost);
router.post("/delete",authCheck, postController.deletePost);

module.exports = router;

