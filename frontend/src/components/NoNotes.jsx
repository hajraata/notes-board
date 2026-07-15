import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NoNotes = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto text-center py-16 space-y-6 max-w-md">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No Notes Yet</h3>
      <p className="text-base-content/70">
        There are no notes yet. Are you ready to create your first note?
      </p>
      <Link to={"/create"} className="btn btn-primary">
        Create A Note
      </Link>
    </div>
  );
};

export default NoNotes;
