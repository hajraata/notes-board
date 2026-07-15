import { PenSquare, ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import RateLimitedUI from "../components/RateLimitedUI";

const NotesDetailPage = () => {
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Do you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully!");
      navigate("/");
    } catch (Error) {
      console.log("Error deleteing note", Error);
      toast.error("Note was not deleted. Try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All Fields Are Required");
      return;
    }

    setIsSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title,
        content,
      });
      toast.success("Note Updated Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed To Update Note. Try Again Later");
      console.log("Error updating note", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setIsRateLimited(false);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.log(err);
        console.log(err.response.status);
        if (err.response?.status === 429) {
          setIsRateLimited(true);
          toast.error("Too many requests. Try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // console.log(note);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5" />
          All Notes
        </Link>

        {isRateLimited && <RateLimitedUI />}

        {note !== null && !isRateLimited && !isLoading && !isEditing && (
          <div className="card mx-w-7xl bg-gray-800 border-t-4 border-solid border-[#16a34a]">
            <div className="card-body">
              <h2 className="card-title text-2xl">{note.title}</h2>
              <p>{note.content}</p>
              <span>{formatDate(new Date(note.createdAt))}</span>

              <div className="card-actions mt-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsEditing(true)}>
                    <PenSquare />
                  </button>
                  <button
                    className="btn btn-ghost btn-xs text-error"
                    onClick={(e) => handleDelete(e, note._id)}
                  >
                    <Trash2Icon className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="card bg-gray-800 border-t-4 border-solid border-[#16a34a]">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Note Content"
                    className="input input-bordered h-20"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesDetailPage;
