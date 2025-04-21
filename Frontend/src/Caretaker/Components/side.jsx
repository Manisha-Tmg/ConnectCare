// import React, { useState, useEffect } from "react";
// import {
//   FaTasks,
//   FaCalendarAlt,
//   FaUser,
//   FaBell,
//   FaCog,
//   FaSignOutAlt,
//   FaHome,
// } from "react-icons/fa";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";
// import { API } from "../../env";
// import "../../output.css";

// const CaretakerSidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("accessToken"));
//   const [data, setData] = useState("");
//   const id = Cookies.get("caretaker_id");

//   useEffect(() => {
//     async function fetchcaretakerdata() {
//       const id = Cookies.get("caretaker_id");
//       try {
//         const res = await fetch(`${API}api/caretakers/${id}`);
//         const data = await res.json();
//         setData(data);
//       } catch (error) {}
//     }
//     fetchcaretakerdata();
//   }, []);

//   const handleLogout = async () => {
//     const confirmLogout = window.confirm("Are you sure you want to log out?");
//     if (confirmLogout) {
//       Cookies.remove("accessToken", { path: "/" });
//       Cookies.remove("role", { path: "/" });
//       Cookies.remove("caretaker_id", { path: "/" });
//       setIsLoggedIn(false);
//       navigate("/login/caretaker");
//     }
//   };

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   const menuItems = [
//     {
//       path: `/dashboard/${id}`,
//       icon: <FaHome className="text-lg" />,
//       label: "Dashboard",
//     },
//     {
//       path: "/notifications",
//       icon: <FaBell className="text-lg" />,
//       label: "Notification",
//     },

//     {
//       path: "/bookings",
//       icon: <FaCalendarAlt className="text-lg" />,
//       label: "Bookings Request",
//     },

//     {
//       path: "/profile",
//       icon: <FaUser className="text-lg" />,
//       label: "Profile",
//     },
//     {
//       path: "/settings",
//       icon: <FaCog className="text-lg" />,
//       label: "Settings",
//     },
//   ];

//   return (
//     <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-md flex flex-col">
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-800">{data.name}</h2>
//           <button className="text-gray-500 hover:text-gray-700">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto">
//         <nav className="mt-2">
//           <ul>
//             {menuItems.map((item, index) => (
//               <li key={index}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
//                     isActive(item.path)
//                       ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
//                       : ""
//                   }`}
//                 >
//                   <span className="mr-3 text-gray-500">{item.icon}</span>
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       <div className="mt-auto border-t border-gray-200">
//         <button
//           onClick={handleLogout}
//           className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
//         >
//           <FaSignOutAlt className="mr-3 text-lg" />
//           <span className="font-medium">Log Out</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CaretakerSidebar;

import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { API } from "../../env";
import "../Css/side.css";

const CaretakerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("accessToken"));
  const [data, setData] = useState("");
  const id = Cookies.get("caretaker_id");

  useEffect(() => {
    async function fetchcaretakerdata() {
      const id = Cookies.get("caretaker_id");
      try {
        const res = await fetch(`${API}api/caretakers/${id}`);
        const data = await res.json();
        setData(data);
      } catch (error) {}
    }
    fetchcaretakerdata();
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("role", { path: "/" });
      Cookies.remove("caretaker_id", { path: "/" });
      setIsLoggedIn(false);
      navigate("/login/caretaker");
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: `/dashboard/${id}`,
      icon: <FaHome className="menu-icon" />,
      label: "Dashboard",
    },

    {
      path: "/booking/",
      icon: <FaCalendarAlt className="menu-icon" />,
      label: "Bookings Request",
    },
    {
      path: "/caretaker/profile",
      icon: <FaUser className="menu-icon" />,
      label: "Profile",
    },
    {
      path: "/settings",
      icon: <FaCog className="menu-icon" />,
      label: "Settings",
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="header-content">
          <h2 className="user-name">{data.name}</h2>
        </div>
      </div>

      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <li key={index} className="menu-item">
                <Link
                  to={item.path}
                  className={`menu-link ${isActive(item.path) ? "active" : ""}`}
                >
                  <span className="icon-wrapper">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="menu-icon" />
          <span className="logout-text">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default CaretakerSidebar;
