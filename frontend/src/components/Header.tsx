import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-green-900 bg-opacity-50 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">RentMe</Link>
        </span>
        <span className="flex space-x-2">
          {/* <Link
            to="/login"
            className="flex bg-white rounded items-center text-green-600 px-3 font-bold hover:bg-gray-300"
          >
            Sign In
          </Link> */}
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center rounded text-white px-3 font-bold hover:text-green-600 hover:bg-white"
                to="/bookings"
              >
                Bookings
              </Link>
              <Link
                className="flex items-center rounded text-white px-3 font-bold hover:text-green-600 hover:bg-white"
                to="/appartments"
              >
                Apartments
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/login"
              className="flex bg-white rounded items-center text-green-600 px-3 font-bold hover:bg-gray-300"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
