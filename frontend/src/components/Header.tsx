import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-white font-bold text-3xl tracking-tight">
          <Link to="/">BookingNest</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/signin"
            className="flex items-center justify-center rounded-md bg-white text-blue-500 px-3 font-medium hover:bg-gray-200"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
