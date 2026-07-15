import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //newest note first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getANoteByID(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res
        .status(404)
        .json({ message: "Note with this ID does not exist" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getANoteByID controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addANote(req, res) {
  try {
    const { title, content } = req.body; // the express.json middleware parses the title and content values in the json

    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("Error in addANote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function updateANote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true },
    );

    if (!updatedNote)
      return res
        .status(404)
        .json({ message: "Note by this ID does not exist" });

    res.status(200).json({ message: "Note Updated Successfully" });
  } catch (error) {
    console.error("Error in updateANote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteANote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteANote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
