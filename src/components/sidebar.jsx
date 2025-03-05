import { useEffect, useState } from "react";
import {
  FaHome,
  FaUserGraduate,
  FaBook,
  FaVideo,
  FaTasks,
  FaDoorOpen,
  FaChalkboardTeacher,
} from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const allItems = {
    Student: [
      { name: "Home", icon: FaHome, path: "/home" },
      { name: "Lessons", icon: FaBook, path: "/lessons" },
      { name: "Videos", icon: FaVideo, path: "/videos" },
      { name: "Activities", icon: FaTasks, path: "/activities" },

      {
        name: "Logout",
        icon: FaDoorOpen,
        path: "/logout",
        onClick: () => {
          localStorage.removeItem("access_token");
          navigate("/login");
        },
      },
    ],
    Teacher: [
      { name: "Home", icon: FaHome, path: "/home" },
      { name: "My Students", icon: FaUserGraduate, path: "/my-students" },
      { name: "Lessons", icon: FaBook, path: "/lessons" },
      { name: "Videos", icon: FaVideo, path: "/videos" },
      { name: "Activities", icon: FaTasks, path: "/activities" },

      {
        name: "Logout",
        icon: FaDoorOpen,
        path: "/logout",
        onClick: () => {
          localStorage.removeItem("access_token");
          navigate("/login");
        },
      },
    ],
    Admin: [
      { name: "Home", icon: FaHome, path: "/home" },
      { name: "Teachers", icon: FaChalkboardTeacher, path: "/teachers" },
      { name: "Students", icon: FaUserGraduate, path: "/students" },
      { name: "Lessons", icon: FaBook, path: "/lessons" },
      { name: "Videos", icon: FaVideo, path: "/videos" },
      { name: "Activities", icon: FaTasks, path: "/activities" },

      {
        name: "Logout",
        icon: FaDoorOpen,
        path: "/logout",
        onClick: () => {
          localStorage.removeItem("access_token");
          navigate("/login");
        },
      },
    ],
  };

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, []);

  const items = allItems[userRole] || [];

  return (
    <aside className="fixed h-screen w-64 bg-primary text-white py-4 border-r-2">
      <div className="h-full flex flex-col gap-6">
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="" className="w-10 h-10" />
          <div>
            <h6 className="font-bold text-sm">Malasiqui Adventist School</h6>
            <p className="text-xs">Learning Management System</p>
          </div>
        </div>
        <ul className="p-2 text-base-content space-y-2">
          {items.map((item) => (
            <li
              key={item.name}
              className={`flex font-semibold items-center gap-3 p-2  ${
                location.pathname.startsWith(item.path)
                  ? "bg-gray-300 text-gray-800"
                  : "hover:bg-gray-300 hover:text-gray-800 text-gray-200"
              } hover:cursor-pointer rounded-md`}
              onClick={item.onClick ? item.onClick : () => navigate(item.path)}
            >
              <item.icon className="w-6 h-6 " />
              <p className="text-sm ">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
