import { Outlet } from "react-router-dom";
import Nav from "../Shared/Nav/Nav";
import Footer from "../Shared/Footer/Footer";
import React from 'react';


const Root = () => {
    return (
        <div>
            <Nav />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;