import { Outlet } from "react-router-dom";
import UserDashboardSidebar from "../UserDashboardSidebar/UserDashboardSidebar";


const UserDashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white h-full fixed transition-all duration-300 ease-in-out z-40 md:w-[240px]">
        <div className="h-full flex flex-col justify-between">
          {/* Sidebar Content */}
          <UserDashboardSidebar />
        </div>
      </div>

      {/* Main Content Area */}

      <div className="flex flex-col md:ml-[240px] md:w-[calc(100%-240px)] w-full">
       
        <div className="h-full  overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;