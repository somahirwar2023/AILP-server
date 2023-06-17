
const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema(
  {
    jobTitle: {
        type: String,
        require: [true, 'Title cannot be empty']
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref: 'Company'
    },
    total: {
        type: Number,
        require: [true, 'Total Salary cannot be empty']
    },
    fixed: {
        type: Number,
        require: [true, 'Fixed salary cannot be empty']
    },
    components: [{
        type: {
            fieldName: {
                type: String,
                require: [true]
            },
            fieldValue: {
                type: String,
                require: [true]
            }
        },
        default: []
    }]
  }
);

const Salary = mongoose.model("Salary", SalarySchema);

module.exports = Salary;
