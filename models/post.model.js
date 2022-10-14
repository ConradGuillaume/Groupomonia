const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    video: {
      type: String,
    },
    picture: {
      type: String,
    },
    likers: { type: [String], required: true },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
PostSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("post", PostSchema);
