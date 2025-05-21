import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAdmin from "../../../Hooks/useAdmin";
import useAuth from "../../../Hooks/useAuth";
import useVolunteer from "../../../Hooks/useVolunteer";
import AdminDashboardHome from "./AdminDashboardHome/AdminDashboardHome";
import DonorDashboard from "./DonorDashboard/DonorDashboard";
import VolunteerDashboardHome from "./VolunteerDashboardHome/VolunteerDashboardHome";
import React from 'react';


const DashboardHome = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();
  

  return (
    <div>
      <SectionTitle
        Heading={"Welcome To Your Dashboard"}
        subHeading={user.displayName}
      />
        {
          isAdmin ? <AdminDashboardHome /> : isVolunteer ? <VolunteerDashboardHome /> : <DonorDashboard />
        }

    </div>
  );
};

export default DashboardHome;