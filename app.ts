import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { appConfig } from "./src/config";

dotenv.config();

const app = express();
appConfig(app);
const port = process.env.PORT || 8080;

const triggerServer = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING || "");
  console.log("DB Connected Successfully");

  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
};
triggerServer();


