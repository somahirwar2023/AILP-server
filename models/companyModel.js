const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        require: [true, "Name cannot be empty"],
    },
    numberOfEmployeeMin:{
        type: Number
    },
    numberOfEmployeeMax: Number,
    descrition: {
        type: String,
        default: ""
    },
    logo: {
      type: String,
      required: true,
    },
    startYear: Date
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
