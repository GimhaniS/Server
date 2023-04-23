import bookModel from "../models/bookModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const getAllBooks = async (req, res) => {
  const AllBooks = await bookModel.find();

  if (AllBooks) {
    res.status(StatusCodes.OK).json({
      AllBooks,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json("There is no books");
  }
};

// const addAbook = async (req, res) => {
//   console.log("req", req);
//   const {
//     ISBN,
//     BookName,
//     Author,
//     Price,
//     Publisher,
//     Place,
//     Edition,
//     PublishedYear,
//     BuyDate,
//     Category,
//     SubCategory,
//     bookCover,
//   } = req.body;

//   const newBook = {
//     ISBN,
//     BookName,
//     Author,
//     Price,
//     Publisher,
//     Place,
//     Edition,
//     PublishedYear,
//     BuyDate,
//     Category,
//     SubCategory,
//     bookCover,
//   };
//   console.log("newBook", newBook);
//   const AddaBookRes = await bookModel.create(newBook);
//   res.status(StatusCodes.CREATED).json({ AddaBookRes });
// };

const deleteABook = async (req, res) => {
  const bookId = req.params.id;
  console.log("id", bookId);
  console.log("req.params", req.params);
  const deletedBook = await bookModel.findByIdAndRemove(bookId);
  if (!deletedBook) {
    return res.status(StatusCodes.NOT_FOUND).json("Book not found");
  }
  res.status(StatusCodes.OK).json(`${deletedBook} book deleted`);
  // console.error(error);
  // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Internal server Error");
};

const updateAbook = async (req, res) => {
  const bookId = req.params.id;
  const {
    ISBN,
    BookName,
    Author,
    Price,
    Publisher,
    Place,
    Edition,
    PublishedYear,
    BuyDate,
    Category,
    SubCategory,
    bookCover,
    createdBy,
  } = req.body;
  const newlyUpdatedBook = {
    ISBN,
    BookName,
    Author,
    Price,
    Publisher,
    Place,
    Edition,
    PublishedYear,
    BuyDate,
    Category,
    SubCategory,
    bookCover,
    createdBy,
  };
  console.log("id", bookId);
  console.log("req.params", req.params);
  console.log("newlyUpdatedBook", newlyUpdatedBook);
  const updatedBook = await bookModel.findByIdAndUpdate(
    bookId,
    newlyUpdatedBook,
    {
      new: true,
    }
  );
  if (!updatedBook) {
    return res.status(StatusCodes.NOT_FOUND).json("Book not found");
  }
  res.status(StatusCodes.OK).json(`${updatedBook} book updated`);
};

const addABookByUser = async (req, res) => {
  const {
    ISBN,
    BookName,
    Author,
    Price,
    Publisher,
    Place,
    Edition,
    PublishedYear,
    BuyDate,
    Category,
    SubCategory,
    bookCover,
    createdBy,
  } = req.body;
  const newBook = {
    ISBN,
    BookName,
    Author,
    Price,
    Publisher,
    Place,
    Edition,
    PublishedYear,
    BuyDate,
    Category,
    SubCategory,
    bookCover,
    createdBy,
  };
  const book = await bookModel.create(newBook);

  if (book) {
    res.status(StatusCodes.CREATED).json({ book });
  } else {
    res.status(StatusCodes.NOT_FOUND).json("Book adding failed");
  }
};

const getABookByUserId = async (req, res) => {
  const { userId } = req.body;
  const bookByUser = await Book.find({ userId });

  if (bookByUser) {
    res.status(StatusCodes.CREATED).json({ bookByUser });
  } else {
    res.status(StatusCodes.NOT_FOUND).json("Books not found");
  }
};
export {
  getAllBooks,
  deleteABook,
  updateAbook,
  addABookByUser,
  getABookByUserId,
};
