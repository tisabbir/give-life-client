import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import React from 'react';


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading){
        return <span className="loading loading-infinity loading-lg text-[#9B111E]"></span>

    }
    if(user){
        return children;
    }
    return <Navigate to={'/login'} state={{from : location}} ></Navigate>
};

export default PrivateRoute;