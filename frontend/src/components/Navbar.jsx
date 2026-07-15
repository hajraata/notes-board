import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import { useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
            NotesBoard
          </h1>
          {location.pathname !== "/create" && (
            <div className="flex items-center gap-4">
              <Link to={"/create"} className="btn btn-primary">
                <PlusIcon className="size-5" />
                {/*size-5 means length and width are both 5  */}
                <span>New Note</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
