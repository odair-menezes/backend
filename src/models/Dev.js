const { Schema, model } = require("mongoose");

const DevSchema = new Schema(
  {
    name: {
      type: String,
      requerid: true
    },
    user: {
      type: String,
      requerid: true
    },
    bio: String,
    avatar: {
      type: String,
      requerid: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev"
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("Dev", DevSchema);
