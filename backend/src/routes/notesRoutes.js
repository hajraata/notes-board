import express from "express";
import {
  addANote,
  deleteANote,
  getAllNotes,
  getANoteByID,
  updateANote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getANoteByID);

router.post("/", addANote);

router.put("/:id", updateANote);

router.delete("/:id", deleteANote);

export default router;
