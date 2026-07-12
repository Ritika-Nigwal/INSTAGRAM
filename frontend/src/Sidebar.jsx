import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Insta from "./assets/Insta.webp";
import {
  HomeOutlined,
  VideoCameraOutlined,
  UserAddOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const Logout = () => {
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/");
  };

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((flag) => !flag)}
        className="fixed top-4 left-4 z-30 md:hidden p-2 bg-white rounded shadow"
      >
        {open ? (
          <CloseOutlined className="text-xl" />
        ) : (
          <MenuOutlined className="text-xl" />
        )}
      </button>

      {/* backdrop on mobile when open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
        />
      )}

      {/* sidebar: group-hover expands on desktop; slides in on mobile */}
      <nav
        className={`fixed top-0 left-0 h-screen  z-20 bg-blue-50  shadow-lg flex flex-col gap-2 transform transition-all duration-200 group ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-20 w-30 md:overflow-visible overflow-auto`}
        aria-label="Main navigation"
      >
        {/* header / brand */}
        <div className="flex items-center gap-3 px-4 py-4 border-b sm:mt-10">
          <img src={Insta} className="h-10 w-10 " />
        </div>

        <ul className="mt-4 flex-1">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex flex-col items-center px-4 py-3 hover:bg-gray-100 transition-colors ${isActive ? "bg-gray-100" : ""}`
              }
              onClick={handleNavClick}
            >
              <HomeOutlined className="text-2xl text-indigo-700" />
              <span className="ml-2 none gradientText text-gray-600  md:inline-block group-hover:inline-block transition-all duration-200 opacity-0 group-hover:opacity-100">
                Home
              </span>
            </NavLink>
          </li>
        
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `flex flex-col items-center px-4 py-3 hover:bg-gray-100 transition-colors ${isActive ? "bg-gray-100" : ""}`
              }
              onClick={handleNavClick}
            >
              <UserAddOutlined className="text-2xl text-indigo-700" />
              <span className="ml-2 gradientText none text-gray-600  md:inline-block group-hover:inline-block transition-all duration-200 opacity-0 group-hover:opacity-100">
                Profile
              </span>
            </NavLink>
          </li>
            <li>
            <NavLink
              to="/reels"
              className={({ isActive }) =>
                `flex flex-col items-center px-4 py-3 hover:bg-gray-100 transition-colors ${isActive ? "bg-gray-100" : ""}`
              }
              onClick={handleNavClick}
            >
              <VideoCameraOutlined className="text-2xl text-indigo-700" />
              <span className="ml-2 gradientText none text-gray-600  md:inline-block group-hover:inline-block transition-all duration-200 opacity-0 group-hover:opacity-100">
                Reels
              </span>
            </NavLink>
          </li>
        </ul>

        <div className="px-4 py-4 border-t">
          <button
            onClick={Logout}
            className="w-full flex flex-col items-center gap-3 px-3 py-2 rounded hover:bg-red-500 transition-colors"
          >
            <LogoutOutlined className="text-red-600 text-xl" />
            <span className=" text-[14px] ml-1 text-white hidden md:inline-block group-hover:inline-block transition-all duration-200 opacity-0 group-hover:opacity-100">
              Logout
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
