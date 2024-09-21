import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index.js";

dotenv.config();

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { dbName: "exam" })
  .then(() => console.log("You are now connected to registrations DB"))
  .catch(() =>
    console.log("Failed to establish connection to registrations DB")
  );

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
