const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  memberFirstName: {
    type: String,
    required: true,
  },
  memberLastName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  native: {
    type: String,
    required: true,
  },
  business: {
    type: String,
  },
  officeAddress: {
    type: String,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  emailID: {
    type: String,
  },
  chequeNo: {
    type: Number,
  },
  dateOfRegistration: {
    type: String,
  },
  photo: {
    type: Buffer,
  },
  representative1_name: {
    type: String,
  },
  representative1_mobileNo: {
    type: String,
  },
  representative2_name: {
    type: String,
  },
  representative2_mobileNo: {
    type: String,
  },
  referredByBoardMember: {
    type: String,
  },
  applicationType: {
    type: String,
    required: true,
  },
  membershipFee: {
    type: String,
  },
  membershipno: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Member", memberSchema);
