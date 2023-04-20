import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide first name"],
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, "please provide last name"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
      unique: true,
    },
    contactNumber: {
      type: Number,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please Confirm password"],
      minlength: 6,
      select: false,
    },
    userType: {
      type: String,
    },
  },
  { timestamps: true }
);

//password hashing
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, userType: this.userType },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
