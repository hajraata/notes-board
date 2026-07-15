import { Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Do you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully!");
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (Error) {
      console.log("Error deleteing note", Error);
      toast.error("Note was not deleted. Try again later.");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-gray-900 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#16a34a]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-primary">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-base-content/60 text-sm">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
