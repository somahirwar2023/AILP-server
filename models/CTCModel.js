
const mongoose = require("mongoose");

const CTCSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        require: [true, 'Title cannot be empty']
    }
  }
);

const CTC = mongoose.model("CTC", CTCSchema);

module.exports = CTC;
