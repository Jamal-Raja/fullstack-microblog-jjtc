import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-neutral-100 px-7 py-2 flex flex-row items-center justify-between gap-2">
      <Link to="/">
        <p className="text-teal-500 text-6xl hover:scale-110 transition-transform">
          Ⓨ
        </p>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>Welcome, {user.displayName}</span>
            {" | "}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            {" | "}
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
