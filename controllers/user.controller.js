const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
  }).select("-password");
};
module.exports.updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  if (req.file) {
    await UserModel.findOne({ _id: req.params.id })
      .then((user) => {
        if (user.picture !== "./uploads/profil/random-user.png") {
          const filename = user.picture.split("/images/")[1];

          fs.unlink(`images/${filename}`, (error) => {
            if (error) throw error;
          });
        }
      })
      .catch((error) => res.status(401).json({ error }));
  }
  const userObject = req.file
    ? {
        ...req.body,
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
  console.log("je termine là ");
};
// fonction à revoir  n'est pas implémenté dans le projet à ce stade du dévelloppement car la supression d'un user demande a ce que les posts 
//les commentaires, les follows , les likes soient traités en même temps 
/*
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
    if (!user) {
      res.status(404).json({ message: "No user to delete" });
    }
  });
};
*/
module.exports.follow = (req, res) => {
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
    // add to following list
    UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
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
      (err) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
