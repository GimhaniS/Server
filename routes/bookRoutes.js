import express from "express";
const router = express.Router();

import {
  getAllBooks,
  addAbook,
  deleteABook,
  updateAbook,
} from "../controllers/bookController.js";

// router.route("/getAllBooks").get(getAllBooks);

// http://localhost:5000/api/book/
router.get("/getAllBooks", getAllBooks);
router.post("/addaBook", addAbook);
router.delete("/deleteABook/:id", deleteABook);
router.post("/updateABook/:id", updateAbook);

export default router;
