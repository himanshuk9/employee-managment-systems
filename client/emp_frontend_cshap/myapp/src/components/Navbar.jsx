import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuth, role, logout, userName } = useAuth(); // userName add kiya

  return (
    <nav className="bg-slate-900 text-white px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="font-bold text-xl">MyApp</Link>

      {/* Links */}
      <ul className="flex gap-6 items-center">
        <li><Link to="/">Home</Link></li>
        {isAuth && <li><Link to="/dashboard">Dashboard</Link></li>}
        {isAuth && role === "Admin" && <li><Link to="/admin">Admin Panel</Link></li>}
      </ul>

      {/* Auth Buttons + User Name */}
      <div className="flex items-center gap-3">
        {!isAuth ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
              Signup
            </Link>
          </>
        ) : (
          <>
            {/* User name */}
            <span className="mr-2 font-medium">Hello, {userName}</span>

            <button 
              onClick={logout} 
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
