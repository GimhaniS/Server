import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    BookTitle: {
      type: String,
      required: [true, "Please provide  a book title"],
    },
    BookDescription: {
      type: String,
    },
    ISBN: {
      type: Number,
    },
    Author: {
      type: Array,
    },
    UnitPrice: {
      type: Number,
    },
    Category: {
      type: String,
    },
    SubCategory: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);
