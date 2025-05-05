import { Link, NavLink, useLocation } from "react-router-dom";

import { BiScan, BiSupport } from "react-icons/bi";
import navberIcon from '../../img/login_icon.png';
import { BsFillChatDotsFill } from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";
import { LuSettings } from "react-icons/lu";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

const UserDashboardSidebar = () => {
  const location = useLocation();
  const isProjectActive = location.pathname.startsWith('/dashboard/technical_manual');
  const isDashboardActive = ["/dashboard", "/dashboard/buyer_order_create", "/dashboard/createBuyerOrder", "/dashboard/buyer_candidate_list"].includes(location.pathname);



  return (
    <div className="pt-10 bg-[#0A3161] ">
      <Link 
      to="/"
      className=" flex gap-4 items-center justify-center border-b-2 border-b-[#FFFFFF] pb-10 cursor-pointer">
        <img src={navberIcon} alt="Logo" className="h-10 w-auto" />
        <span className='text-[24px] font-bold font-roboto text-[#FFFFFF]'>ShipMate Ai</span>
      </Link>
      <div className="flex flex-col gap-2 pt-10 mx-4 h-screen relative">
        <NavLink
          to="/dashboard"

          className={`flex items-center gap-3 px-3 py-3 transition-colors duration-200  ${isDashboardActive ? 'bg-[white] text-[#0A3161] rounded-md' : 'hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md'
            }`}

        >
          <BiScan  className="h-6 w-6" />
          <h1 className="text-lg font-medium">Parts Scanner</h1>
        </NavLink>

        <NavLink
          to="/dashboard/ai_assistant"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${isActive ? 'bg-[white] text-[#0A3161] rounded-md' : 'hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md'
            }`
          }
        >
        <IoChatbubbleEllipsesOutline
            className="h-6 w-6" />
          <h1 className="text-lg font-medium">AI Assistant</h1>
        </NavLink>

        <NavLink
          to="/dashboard/technical_manual"
          className={() =>
            `flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${isProjectActive ? 'bg-[white] text-[#0A3161] rounded-md' : 'hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md'
            }`
          }
        >
          <RiUserSettingsLine className="h-6 w-6" />
          <h1 className="text-lg font-medium">Technical manuals</h1>
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 transition-colors duration-200 ${isActive ? 'bg-[white] text-[#0A3161] rounded-md' : 'hover:bg-gray-400 text-white hover:text-[#0A3161] rounded-md'
            }`
          }
        >
          <LuSettings className="h-6 w-6" />
          <h1 className="text-lg font-medium">Settings</h1>
        </NavLink>

       
      <button className="text-[white] flex gap-2 items-center justify-center absolute bottom-40 cursor-pointer left-10  ">Logout <MdOutlineLogout /></button>
      </div>

    </div>
  );
};

export default UserDashboardSidebar;