import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

//error-hanlder
import "express-async-errors";

import morgan from "morgan";

// db
import connectDB from "./config/db.js";

// routers
import bookRouter from "./routes/bookRoutes.js";

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.use("/api/book", bookRouter);

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
