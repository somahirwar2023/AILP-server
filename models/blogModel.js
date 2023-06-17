const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    description: String,
    votes: Number,
    views: Number,
    trendRating: Number,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true,
  }
);

blogSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

blogSchema.pre(/^find/, function (next) {
  this.populate('user').populate('comments');
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog
