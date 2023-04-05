import bookModel from "../models/bookModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const getAllBooks = async (req, res) => {
  const AllBooks = await bookModel.find({});

  res.status(StatusCodes.OK).json({
    AllBooks,
  });
};

export { getAllBooks };
