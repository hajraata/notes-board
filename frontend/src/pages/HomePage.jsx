import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard.jsx";
import NoNotes from "../components/NoNotes.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        // console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (err) {
        console.log("Error fetching notes", err);
        if (err.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes. Try again later");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4">
        {isLoading && (
          <div className="text-center text-primary py-10">Loading...</div>
        )}

        {notes.length === 0 && !isRateLimited && !isLoading && <NoNotes />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
