const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

module.exports.readPosts = (req, res, next) => {
  const post = req.query.p || 5;

  PostModel.find()
    .sort({ createdAt: -1 })
    .limit(post)
    .then((docs) => {
      console.log("RES", docs);
      res.json(docs);
    })
    .catch((error) => {
      res.json(console.log(error));
    });
};
module.exports.createPost = async (req, res) => {
  console.log("ID", req.body.posterId);
  console.log("MESSAGE", req.body.message);
  console.log("VIDEO", req.body.video);
  console.log("FILE", req.file);
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    Comments: [],
    picture:
      req.file != null
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : "",
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err); //////////  à  vérifier send ///////////////////////////////////////
  }
};

module.exports.updatePost = async (req, res, next) => {
  console.log("REQ PARAMS", req.params.id);
  console.log("REQ BODY", req.body);
  console.log("FILE", req.file);
  console.log("MESSAGE", req.body.message);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  if (req.file) {
    PostModel.findOne({ _id: req.params.id })
      .then((post) => {
        console.log("USER", post);
        if (post.picture) {
          const filename = post.picture.split("/images/")[1];
          console.log("SUPR PHOTO", filename);
          fs.unlink(`images/${filename}`, (error) => {
            if (error) throw error;
          });
        }
      })
      .catch((error) => res.status(401).json({ error }));
  }
  const postObject = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  console.log("POSTOBJEC", postObject);
  PostModel.updateOne(
    { _id: req.params.id },
    { ...postObject, _id: req.params.id },
    { $set: { message: req.body.message } }
  )
    .then(() => res.status(200).json({ message: "Modified message" }))
    .catch((error) => res.status(400).json({ error }));

  console.log("post object", postObject);
};

module.exports.deletePost = (req, res) => {
  console.log("REQ PARAMS", req.params.id);
  PostModel.findOne({ _id: req.params.id }).then((user) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send("ID unknown : " + req.params.id);
    } else {
      const filename = user.picture.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        PostModel.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Deleted" }))
          .catch((error) => res.status(400).json({ error }));
      });
    }
  });
};

module.exports.likePost = (req, res, next) => {
  console.log("PARAMS ICI", req.params.id);

  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    console.log("BODY ICI ", req.body.id);
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.status(201).json({ message: "user liked" });
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.commentPost = (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  PostModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        comments: {
          commenterId: req.body.commenterId,
          commenterPseudo: req.body.commenterPseudo,
          text: req.body.text,
          timestamp: new Date().getTime(),
        },
      },
    },
    { new: true }
  )
    .then(() => res.status(200).json({ message: "Comment created" }))
    .catch((error) => res.status(400).json({ error }));
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  console.log("IDHERE", req.params.id);
  console.log("COMMENT ID", req.body.commentId);
  console.log("TEXT", req.body.text);
  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
