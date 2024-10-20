const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userwebappSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    universityName: {
      type: String,
      required: true, 
    },
    dob: {
      type: Date,
      required: true, // Optional: set to false if this field is not required
    },
    currentLevelOfEducation: {
      type: String,
      required: true, // Optional: set to false if this field is not required
    },
    fieldOfInterest: {
      type: String,
      required: true, // Optional: set to false if this field is not required
    },
  },
  {
    timestamps: true,
  }
);

userwebappSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userwebappSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Userwebapp = mongoose.model("Userwebapp", userwebappSchema);

module.exports = Userwebapp;
