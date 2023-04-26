import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    ISBN: {
      type: String,
    },
    BookName: {
      type: String,
      // required: [true, "Please provide  a book title"],
    },
    Author: {
      type: String,
    },
    Price: {
      type: String,
    },
    Publisher: {
      type: String,
    },
    Place: {
      type: String,
    },
    Edition: {
      type: String,
    },
    PublishedYear: {
      type: Number,
    },
    BuyDate: {
      type: String,
    },
    Category: {
      type: Array,
    },
    SubCategory: {
      type: Array,
    },
    bookCover: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Books", BookSchema);
