const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
        type: String,
        require: [true, "Comment cannot be empty"]
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'parentModelName'
    },
    parentModelName: {
        type: String,
        required: true,
        enum: ['InterviewExperience', 'Blog']
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }

  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate('user');
  next();
});


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
