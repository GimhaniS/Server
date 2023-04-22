import userModel from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const {
    fullName,
    email,
    contactNumber,
    password,
    confirmPassword,
    userType,
  } = req.body;
  console.log("res", res);
  if (!fullName || !email || !password || !confirmPassword) {
    throw new BadRequestError("Please Provide values");
  }

  const userAlreadyExists = await userModel.findOne({ email });

  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const user = await userModel.create({
    fullName,
    email,
    contactNumber,
    password,
    confirmPassword,
    userType,
  });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      fullName: fullName,
      email: email,
      contactNumber: contactNumber,
      password: password,
      confirmPassword: confirmPassword,
      userType: userType,
      token: token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // if (!email || !password) {
  //   throw new BadRequestError("Please Provide email and password");
  // }
  if (!email || !password) {
    res.status(400).json({ message: "Please Provide email and password" });
  }
  const user = await userModel.findOne({ email }).select("+password _id");
  if (!user) {
    res.status(400).json({ message: "User does not exists" });
  }
  console.log("user", user);
  // if (!user) {
  //   throw new UnAuthenticatedError("Invalid Credentials");
  // }
  //  Convert user id (ObjectId) to a string
  const userId = user._id.toHexString();
  //  Now user id is a string
  console.log("userId", userId);

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(400).json({ message: "Invalid Credentials" });
  }
  // if (!isPasswordCorrect) {
  //   throw new UnAuthenticatedError("Invalid Credentials");
  // }

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user: user,
    token: token,
  });
};
export { register, login };
