const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  console.log("params here ", req.params);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown :" + err);
  }).select("-password");
};
module.exports.updateUser = async (req, res) => {
  ////////////////////////////////////////////////////////////////////////////////////////////////////// gerer les images !!!!!!!
  console.log("REQ PARAMS", req.params.id);
  console.log("REQ BODY", req.body);
  console.log("FILE", req.file);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  if (req.file) {
    UserModel.findOne({ _id: req.params.id })
      .then((user) => {
        console.log("USER", user);
        if (user.picture !== "./uploads/profil/random-user.png") {
          const filename = user.picture.split("/images/")[1];
          console.log("SUPR PHOTO", filename);
          fs.unlink(`images/${filename}`, (error) => {
            if (error) throw error;
          });
        }
      })
      .catch((error) => res.status(401).json({ error }));
  }
  const userObject = req.file
    ? {
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  UserModel.updateOne(
    { _id: req.params.id },
    { ...userObject, _id: req.params.id },
    {
      $set: {
        bio: req.body.bio,
      },
    }
  )
    .then(() => res.status(200).json({ message: "User updated" }))
    .catch((error) => res.status(400).json({ error }));
};

module.exports.deleteUser = (req, res) => {
  UserModel.findOne({ _id: req.params.id }).then((user) => {
    const filename = user.picture.split("/images")[1];
    fs.unlink(`images/${filename}`, () => {
      UserModel.deleteOne({ _id: req.params.id })
        .then(() => {
          res
            .status(200)
            .json({ message: "User and user's data has been delete" });
        })
        .catch((error) => res.status(400).json({ error }));
    });
    // }
    if (!user) {
      res.status(404).json({ message: "No user to delete" });
    }
  });
};

module.exports.follow = (req, res) => {
  console.log("ID TO FOLLOW", req.body.idToFollow);
  console.log("PARAMS ID", req.params.id);
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    //add to the follower list
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(200).json(docs);
        else return res.status(400).json(err);
      }
    );
    // add to following list//////////////////////////////////////////////////////////////////////////à Revoir
    UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  console.log("ID TO UNFOLLOW", req.body.idToUnFollow);
  console.log("PARAMS ID", req.params.id);
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    console.log("unfollow la", req.body.idToUnFollow);
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    // add to following list
    UserModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        //if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
