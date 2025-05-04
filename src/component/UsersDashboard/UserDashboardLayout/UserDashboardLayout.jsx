import { Outlet } from "react-router-dom";
import UserDashboardSidebar from "../UserDashboardSidebar/UserDashboardSidebar";


const UserDashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white h-full fixed transition-all duration-300 ease-in-out z-40 w-[240px]">
        <div className="h-full flex flex-col justify-between">
          {/* Sidebar Content */}
          <UserDashboardSidebar />
        </div>
      </div>

      {/* Main Content Area */}

      <div className="flex flex-col ml-[240px] w-[calc(100%-240px)]">
        {/* Navbar - Full width and above sidebar */}
       

        {/* Outlet (Main Content) */}
        <div className="h-full  overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;