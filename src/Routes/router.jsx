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
import UpdateRequest from "../Pages/Dashboard/UpdateRequest/UpdateRequest";
import RequestDetail from "../Pages/Dashboard/RequestDetails/RequestDetail";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests/MyDonationRequests";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllBloodDonationRequest from "../Pages/Dashboard/AllBloodDonationRequest/AllBloodDonationRequest";
import ContentManagement from "../Pages/Dashboard/ContentManagement/ContentManagement";
import AddBlog from "../Pages/Dashboard/ContentManagement/AddBlog/AddBlog";
import DonationRequest from "../Pages/DonationRequest/DonationRequest";
import BlogPage from "../Pages/BlogPage/BlogPage";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";

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
        path: "/donationRequest",
        element: <DonationRequest />,
      },
      {
        path: "/blogPage",
        element: <BlogPage />,
      },
      {
        path: "/blogDetails/:id",
        element: <PrivateRoute><BlogDetails /></PrivateRoute>,
        loader: ({params})=>fetch(`http://localhost:5000/blogs/${params.id}`)
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          
          {
            path: "/dashboard",
            element: <PrivateRoute><DashboardHome /></PrivateRoute>,
          },
          //admin related
          {
            path: "all-users",
            element: <PrivateRoute><AllUsers /></PrivateRoute>,
          },
          {
            path: "all-blood-donation-request",
            element: <PrivateRoute><AllBloodDonationRequest /></PrivateRoute>,
          },
          {
            path: "content-management",
            element: <PrivateRoute><ContentManagement /></PrivateRoute>,
          },
          {
            path: '/dashboard/content-management/add-blog', 
            element: <PrivateRoute><AddBlog /></PrivateRoute>
          },
          //Donor Related
          {
            path: "profile",
            element: <PrivateRoute><Profile /></PrivateRoute>,
          },
          {
            path: "create-donation-request",
            element: <PrivateRoute><CreateDonationRequest /></PrivateRoute>,
          },
          {
            path: 'my-donation-requests',
            element: <PrivateRoute><MyDonationRequests /></PrivateRoute>
          },
          {
            path: "updateRequest/:id",
            element: <PrivateRoute><UpdateRequest /></PrivateRoute>,
            loader: ({params})=>fetch(`http://localhost:5000/requests/${params.id}`)
          },
          {
            path: "requestDetails/:id",
            element: <PrivateRoute><RequestDetail /></PrivateRoute>,
            loader: ({params})=>fetch(`http://localhost:5000/requests/${params.id}`)
          },
        ],
      },
    ],
  },
]);

export default router;
