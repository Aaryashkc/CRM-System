import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, UserPlus, LogIn, LayoutDashboard, UserPlus2 } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // clear session + Zustand
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-blue-600 tracking-wide">
        CRM System
      </Link>

      <ul className="flex gap-6 items-center">
        {authUser ? (
          <>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium ${isActive && "underline"}`
                }
              >
                <LayoutDashboard className="inline-block mr-1" size={18} />
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/addclient"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium ${isActive && "underline"}`
                }
              >
                <UserPlus2 className="inline-block mr-1" size={18} />
                Add Client
              </NavLink>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium flex items-center"
              >
                <LogOut className="inline-block mr-1" size={18} />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium ${isActive && "underline"}`
                }
              >
                <LogIn className="inline-block mr-1" size={18} />
                Login
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium ${isActive && "underline"}`
                }
              >
                <UserPlus className="inline-block mr-1" size={18} />
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
