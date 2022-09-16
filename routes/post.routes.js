const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("../middleware/multer");

router.get("/", postController.readPosts);
router.post("/", multer, postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

// route commentaires //
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
