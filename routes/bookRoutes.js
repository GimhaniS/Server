import express from "express";
const router = express.Router();
const multer = require("multer");
import {
  getAbookById,
  deleteABook,
  updateAbook,
  addABookByUser,
  getAllBookByUserId,
  bookCoverUploadByBook,
} from "../controllers/bookController.js";

// router.route("/getAllBooks").get(getAllBooks);

// http://localhost:5000/api/book/.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/books");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({ storage: storage });
router.get("/getAbookById", getAbookById);
// router.post("/addaBook", addAbook);
router.delete("/deleteABook/:id", deleteABook);
router.put("/updateABook/:id", updateAbook);
router.post("/addABookByUser", addABookByUser);
router.get("/getAllBookByUserId", getAllBookByUserId);
router.post("/book/image", upload.single("bookImage"), bookCoverUploadByBook);

export default router;
