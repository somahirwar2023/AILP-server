const mongoose = require("mongoose");

const interviewExperienceSchema = new mongoose.Schema(
  {
    
  }
);

const InterviewExperience = mongoose.model("InterviewExperience", interviewExperienceSchema);

module.exports = InterviewExperience;
