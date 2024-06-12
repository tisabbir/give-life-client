import { FaHouse, FaPeopleGroup, FaPerson } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { BiSolidDonateBlood } from "react-icons/bi";
import { RiArticleFill } from "react-icons/ri";
import useAdmin from "../Hooks/useAdmin";
import useVolunteer from "../Hooks/useVolunteer";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();
  console.log(isAdmin);
  console.log(isVolunteer);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-80 pt-24 px-4 bg-[#9B111E] pb-4 text-white md:min-h-screen space-y-2">
        <NavLink
          to={"/dashboard"}
          className="btn btn-ghost flex justify-start items-center gap-1 "
        >
          {" "}
          <FaHouse /> Dashboard Home
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#9B111E" : "white",
              backgroundColor: isActive ? "white" : "",
            };
          }}
          to={"/dashboard/profile"}
          className="btn btn-ghost flex justify-start items-center gap-1 "
        >
          {" "}
          <FaPerson /> Profile
        </NavLink>

        {isAdmin ? (
          <>
            {" "}
            <NavLink
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#9B111E" : "white",
                  backgroundColor: isActive ? "white" : "",
                };
              }}
              to={"/dashboard/all-users"}
              className=" btn btn-ghost flex justify-start items-center gap-1 "
            >
              {" "}
              <FaPeopleGroup /> All Users
            </NavLink>{" "}
            <NavLink
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#9B111E" : "white",
                  backgroundColor: isActive ? "white" : "",
                };
              }}
              to={"/dashboard/all-blood-donation-request"}
              className=" btn btn-ghost flex justify-start items-center gap-1 "
            >
              {" "}
              <BiSolidDonateBlood /> All Blood Donation Request
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#9B111E" : "white",
                  backgroundColor: isActive ? "white" : "",
                };
              }}
              to={"/dashboard/content-management"}
              className=" btn btn-ghost flex justify-start items-center gap-1 "
            >
              {" "}
              <RiArticleFill /> Content Management
            </NavLink>{" "}
          </>
        ) : isVolunteer ? (
          <>
            {" "}
            <NavLink
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#9B111E" : "white",
                  backgroundColor: isActive ? "white" : "",
                };
              }}
              to={"/dashboard/all-blood-donation-request"}
              className=" btn btn-ghost flex justify-start items-center gap-1 "
            >
              {" "}
              <BiSolidDonateBlood /> All Blood Donation Request
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#9B111E" : "white",
                  backgroundColor: isActive ? "white" : "",
                };
              }}
              to={"/dashboard/content-management"}
              className=" btn btn-ghost flex justify-start items-center gap-1 "
            >
              {" "}
              <RiArticleFill /> Content Management
            </NavLink>{" "}
          </>
        ) : (
          <>
            {" "}
            <NavLink
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#9B111E" : "white",
                  backgroundColor: isActive ? "white" : "",
                };
              }}
              to={"/dashboard/create-donation-request"}
              className=" btn btn-ghost flex justify-start items-center gap-1 "
            >
              {" "}
              <IoIosAddCircle /> Create Donation Request
            </NavLink>
          </>
        )}
      </div>
      <div className="pt-24 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
