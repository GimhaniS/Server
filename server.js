// this is a javascript file

import express from "express";
import mongoose from "mongoose";
// import bookModel from "./models/bookModel.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

import morgan from "morgan";
import connectDB from "./config/db.js";

// connect mongodb with mongoose

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => console.log(err));

// app.listen(3000, () => {
//   console.log("server is running port :3000");
// });

const start = async () => {
  try {
    // mongoose.set("strictQuery", false);
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server is listing on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// this is a javascript file
// app.post("book-relates-be.vercel.app/create", async (req, res) => {
//   const BookTitle = req.body.BookTitle;
//   const BookDescription = req.body.BookDescription;
//   const ISBN = req.body.ISBN;
//   const Author = req.body.Author;
//   const UnitPrice = req.body.UnitPrice;
//   const Category = req.body.Category;
//   const SubCategory = req.body.UnitSubCategoryPrice;
//   const book = new bookModel({
//     BookTitle: BookTitle,
//     BookDescription: BookDescription,
//     ISBN: ISBN,
//     Author: Author,
//     UnitPrice: UnitPrice,
//     Category: Category,
//     SubCategory: SubCategory,
//   });
//   try {
//     await book.save();
//     res.status(201).json({
//       message: "book added",
//       workout,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });
