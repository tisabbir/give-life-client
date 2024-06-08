import { FaPerson } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 pt-24 pl-6 bg-[#9B111E] text-white min-h-screen h-full">
        <NavLink to={'/dashboard/profile'} className='flex items-center gap-1 '> <FaPerson /> Profile</NavLink>
      </div>
      <div className="pt-24">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
