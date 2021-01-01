const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    trim:true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email id");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
    trim:true,
  },
  message: {
    type: String,
    required: true,
    minlength: 10,
    trim:true,
  },
  date: {
    type: Date,
    default: Date.now(),
  }
});

const User = mongoose.model("contact", contactSchema);

module.exports = User;
