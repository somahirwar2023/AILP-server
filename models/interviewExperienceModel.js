const mongoose = require("mongoose");

const interviewExperienceSchema = new mongoose.Schema(
  {
    title: String,
    company: {
        type: mongoose.Types.ObjectId,
        ref: 'Company'
    },
    salary: {
      type: mongoose.Types.ObjectId,
      ref: 'Salary'
    },
    description: String
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

interviewExperienceSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

interviewExperienceSchema.pre(/^find/, function (next) {
  this.populate('company').populate('salary').populate('comments');
  next();
});


const InterviewExperience = mongoose.model("InterviewExperience", interviewExperienceSchema);

module.exports = InterviewExperience;
