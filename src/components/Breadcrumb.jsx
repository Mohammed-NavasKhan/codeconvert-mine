import { Link, useLocation } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="bg-secondary text-white py-2 px-8">
      <div className="container mx-auto px-8">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="#" className="hover:text-gray-300 font-bold ">
            Home
          </Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <span key={name} className="flex items-center">
                <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
                {isLast ? (
                  <span className="capitalize">{name}</span>
                ) : (
                  <Link
                    to={routeTo}
                    className="capitalize hover:text-gray-300 font-bold"
                  >
                    {name}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default Breadcrumb;
