import { FaPerson } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-64 pt-24 pl-6 bg-[#9B111E] pb-4 text-white md:min-h-screen">
        <NavLink to={'/dashboard/profile'} className='flex items-center gap-1 '> <FaPerson /> Profile</NavLink>
      </div>
      <div className="pt-24 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
