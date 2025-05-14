


// import { Link, NavLink, useLocation } from "react-router-dom";
// import { BiScan } from "react-icons/bi";
// import navberIcon from '../../img/login_icon.png';
// import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
// import { RiUserSettingsLine } from "react-icons/ri";
// import { LuSettings } from "react-icons/lu";
// import { MdOutlineLogout } from "react-icons/md";
// import { IoReorderThree } from "react-icons/io5";
// import { RxCross2 } from "react-icons/rx";
// import { useState } from "react";

// const UserDashboardSidebar = () => {
//   const location = useLocation();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const isProjectActive = location.pathname.startsWith('/dashboard/technical_manual');
//   const isDashboardActive = ["/dashboard", "/dashboard/buyer_order_create", "/dashboard/createBuyerOrder", "/dashboard/buyer_candidate_list"].includes(location.pathname);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       {/* Hamburger Menu for Small Devices */}
//       <div className="lg:hidden fixed top-2 left-4 z-50 ">
//         <button onClick={toggleSidebar} className="text-gray-300 text-2xl">
//           {isSidebarOpen ? <RxCross2 className="ml-48"/> : <IoReorderThree className="text-[#0A3161] " />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 md:w-64 w-60 bg-[#0A3161] pt-10  transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 lg:static lg:w-64 lg:h-screen`}
//       >
//         <Link
//           to="/"
//           className="flex gap-4 items-center justify-center border-b-2 border-b-[#FFFFFF] md:pb-10 pb-6  cursor-pointer"
//         >
//           <img src={navberIcon} alt="Logo" className="md:h-10 h-8 w-auto" />
//           <span className="md:text-[24px] text-xl font-bold font-roboto text-[#FFFFFF]">ShipMate Ai</span>
//         </Link>
//         <div className="flex flex-col gap-2 pt-10 mx-4 h-full relative">
//           <NavLink
//             to="/dashboard"
//             className={`flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${
//               isDashboardActive
//                 ? "bg-[white] text-[#0A3161] rounded-md"
//                 : "hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md"
//             }`}
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             <BiScan className="h-6 w-6" />
//             <h1 className="text-lg font-medium">Parts Scanner</h1>
//           </NavLink>

//           <NavLink
//             to="/dashboard/ai_assistant"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${
//                 isActive
//                   ? "bg-[white] text-[#0A3161] rounded-md"
//                   : "hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md"
//               }`
//             }
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             <IoChatbubbleEllipsesOutline className="h-6 w-6" />
//             <h1 className="text-lg font-medium">AI Assistant</h1>
//           </NavLink>

//           <NavLink
//             to="/dashboard/technical_manual"
//             className={`flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${
//               isProjectActive
//                 ? "bg-[white] text-[#0A3161] rounded-md"
//                 : "hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md"
//             }`}
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             <RiUserSettingsLine className="h-6 w-6" />
//             <h1 className="text-lg font-medium">Technical manuals</h1>
//           </NavLink>

//           <NavLink
//             to="/dashboard/settings"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${
//                 isActive
//                   ? "bg-[white] text-[#0A3161] rounded-md"
//                   : "hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md"
//               }`
//             }
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             <LuSettings className="h-6 w-6" />
//             <h1 className="text-lg font-medium">Settings</h1>
//           </NavLink>

//           <button
//             className="text-[white] flex gap-2 items-center justify-center absolute bottom-40 cursor-pointer left-10"
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             Logout <MdOutlineLogout />
//           </button>
//         </div>
//       </div>

//       {/* Overlay for Small Devices */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0  bg-opacity-50 z-30 lg:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default UserDashboardSidebar;

import { Link, NavLink, useLocation } from "react-router-dom";
import { BiScan } from "react-icons/bi";
import navberIcon from '../../img/login_icon.png';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { LuSettings } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { IoReorderThree } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const UserDashboardSidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isProjectActive = location.pathname.startsWith('/dashboard/technical_manual');
  const isDashboardActive = ["/dashboard", "/dashboard/buyer_order_create", "/dashboard/createBuyerOrder", "/dashboard/buyer_candidate_list"].includes(location.pathname);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Small Devices */}
      <div className="lg:hidden fixed top-2 left-4 z-50">
        <button onClick={toggleSidebar} className="text-gray-300 text-xl">
          <IoReorderThree className="text-[#0A3161]" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 md:w-64 w-60 bg-[#0A3161] pt-10 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 lg:static lg:w-64 lg:h-screen`}
      >
        {/* Cross Icon for Closing Sidebar (Small Devices) */}
        {isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="lg:hidden absolute top-2 right-2 text-white text-xl"
          >
            <RxCross2 />
          </button>
        )}

        <Link
       
          className="flex gap-4 items-center justify-center border-b-2 border-b-[#FFFFFF] md:pb-10 pb-6 cursor-pointer"
        >
          <img src={navberIcon} alt="Logo" className="md:h-10 h-8 w-auto" />
          <span className="md:text-[24px] text-xl font-bold font-roboto text-[#FFFFFF]">ShipMate Ai</span>
        </Link>
        <div className="flex flex-col gap-2 pt-10 mx-4 h-full relative">
          <NavLink
            to="/dashboard"
            className={`flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${
              isDashboardActive
                ? "bg-[white] text-[#0A3161] rounded-md"
                : "hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <BiScan className="h-6 w-6" />
            <h1 className="text-lg font-medium">Parts Scanner</h1>
          </NavLink>

          <NavLink
            to="/dashboard/ai_assistant"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${
                isActive
                  ? "bg-[white] text-[#0A3161] rounded-md"
                  : "hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <IoChatbubbleEllipsesOutline className="h-6 w-6" />
            <h1 className="text-lg font-medium">AI Assistant</h1>
          </NavLink>

          <NavLink
            to="/dashboard/technical_manual"
            className={`flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${
              isProjectActive
                ? "bg-[white] text-[#0A3161] rounded-md"
                : "hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <RiUserSettingsLine className="h-6 w-6" />
            <h1 className="text-lg font-medium">Technical manuals</h1>
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${
                isActive
                  ? "bg-[white] text-[#0A3161] rounded-md"
                  : "hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <LuSettings className="h-6 w-6" />
            <h1 className="text-lg font-medium">Settings</h1>
          </NavLink>

          {/* <button
            className="text-[white] flex gap-2 items-center justify-center absolute bottom-40 cursor-pointer left-10"
            onClick={() => setIsSidebarOpen(false)}
          >
            Logout <MdOutlineLogout />
          </button> */}
        </div>
      </div>

      {/* Overlay for Small Devices */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default UserDashboardSidebar;