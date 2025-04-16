import { BuildingLibraryIcon, CpuChipIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-8">
        <div className="flex flex-wrap items-center justify-between h-28 md:h-16">
          <Link to="/" className="text-xl font-medium">
            <div className="icon-container">
              <div className="shape-container">
                <h1 className="font-bold pl-8">Haythm AI</h1>
              </div>
            </div>
            <span className="sr-only">Lloyds Bank Logo</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link
              to="/modernisation"
              className="text-md font-medium text-white flex align-top gap-1"
            >
              <BuildingLibraryIcon className="w-5 h-5" />
              <span>Modernisation</span>
            </Link>
            <Link
              to="/chat"
              className="text-md font-medium text-white flex align-top gap-1"
            >
              <CpuChipIcon className="w-5 h-5" />
              <span>Chat</span>
            </Link>
            <Link
              to="/"
              className="text-md font-medium text-white flex align-top gap-1"
            >
              <LockClosedIcon className="w-5 h-5" />
              <span>Log on</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
