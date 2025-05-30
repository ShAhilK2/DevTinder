const { default: mongoose } = require("mongoose");
const validate = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data is not valid");
        }
      },
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validate.isEmail(value)) {
          throw new Error("Invalid Email Address " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validate.isStrongPassword(value)) {
          throw new Error("Please make Strong Password");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://api.dicebear.com/9.x/lorelei/svg?flip=true",
      validate(value) {
        if (!validate.isURL(value)) {
          throw new Error("Invalid photo Url " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
      validate: {
        validator: (value) => {
          return value.length <= 10;
        },
        message: "Users cannot have more than 10 skills",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DevTinder@88", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.ValidatePassword = async function (passwordInput) {
  const user = this;
  const hashedPassword = this.password;
  const isPasswordValid = await bcrypt.compare(passwordInput, hashedPassword);
  return isPasswordValid;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
