//setting type as "module" in package.json
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

//setting type as "commonjs" in package.json
// const express = require("express");

// to use environment variables
dotenv.config();

// initialize a new instance of an Express backend application
const app = express();

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

// middleware

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  ); // allows access /resource sharing from any domain if none is specified
}

app.use(express.json()); // enables access to the content inside a json/ parses a json

app.use(rateLimiter);

app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// listening for client requests after connecting to DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running...");
  });
});
