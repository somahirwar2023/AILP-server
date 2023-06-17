
const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
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
    location: String,
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

salarySchema.pre(/^find/, function (next) {
    this.populate({
      path: "company"   
    });
    next();
  });
  

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;
