import express from "express";
const router = express.Router();

import { getAllBooks } from "../controllers/bookController.js";

router.route("/getAllBooks").get(getAllBooks);

export default router;
