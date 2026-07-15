//setting type as "module" in package.json
import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

//setting type as "commonjs" in package.json
// const express = require("express");

// to use environment variables
dotenv.config();

// initialize a new instance of an Express backend application
const app = express();

const PORT = process.env.PORT || 5001;

// middleware

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
); // allows access /resource sharing from any domain if none is specified

app.use(express.json()); // enables access to the content inside a json/ parses a json

app.use(rateLimiter);

app.use("/api/notes", notesRouter);

// listening for client requests after connecting to DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running...");
  });
});
