import { Link, NavLink } from "react-router-dom";
import PrimaryBtn from "../../Components/PrimaryButton/PrimaryBtn";
import useAuth from "../../Hooks/useAuth";
import React from 'react';

const Nav = () => {
  const {user} = useAuth();
  const {logOut} = useAuth();
  const handleLogOut = () => {
    logOut()
    .then(()=>{
      console.log("Logged Out");
    })
    .catch(err => {
      console.log(err);
    })
  }

  const navbar = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={"hover:text-[#9B111E]"}
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#9B111E" : "",
              backgroundColor: isActive ? "white" : "white",
            };
          }}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:text-[#9B111E]"
          to={"/donationRequest"}
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#9B111E" : "",
              backgroundColor: isActive ? "white" : "white",
            };
          }}
        >
          Donation Request
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:text-[#9B111E]"
          to={"/blogPage"}
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#9B111E" : "",
              backgroundColor: isActive ? "white" : "white",
            };
          }}
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:text-[#9B111E]"
          to={"/link"}
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#9B111E" : "",
              backgroundColor: isActive ? "white" : "white",
            };
          }}
        >
          Link
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="w-full fixed z-50">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navbar}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-2xl font-bold">
            Give<span className="text-[#9B111E]">Life</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navbar}</ul>
        </div>
        <div className="navbar-end">
          {
            //this button will be conditional
            user ? (
              <>
                <details className="dropdown">
                  <summary className="m-1 avatar">
                    <div className="w-12 rounded-full">
                      <img src={user.photoURL} />
                    </div>
                  </summary>
                  <ul className="-ml-24 shadow menu dropdown-content z-[10] bg-base-100 rounded-box w-36">
                    <li>
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Logout</button>
                    </li>
                  </ul>
                </details>
              </>
            ) : (
              <Link to={"/login"}>
                <PrimaryBtn btnText={"Login"} />
              </Link>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Nav;
