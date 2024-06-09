import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonation/CreateDonationRequest";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          
          {
            path: "/dashboard",
            element: <PrivateRoute><DashboardHome /></PrivateRoute>,
          },
          {
            path: "profile",
            element: <PrivateRoute><Profile /></PrivateRoute>,
          },
          {
            path: "create-donation-request",
            element: <PrivateRoute><CreateDonationRequest /></PrivateRoute>,
          },
        ],
      },
    ],
  },
]);

export default router;
