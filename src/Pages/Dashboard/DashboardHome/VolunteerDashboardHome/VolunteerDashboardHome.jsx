import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { FaUsers } from "react-icons/fa6";
import { FaDonate } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import React from 'react';

const VolunteerDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  
  
  const { data: donationRequests} = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests`);
      return res.data;
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mx-auto my-12 items-center gap-4">

      <div className="flex gap-10 items-center bg-base-200 p-4 max-w-fit rounded-xl mx-auto">
        <div className="p-4 bg-[#c5414e24] rounded-xl">
          <FaUsers className="text-5xl text-[#9B111E] " />
        </div>
        <div>
          <SectionTitle subHeading={"Total Users"} Heading={'8'} />
        </div>
      </div>

      <div className="flex gap-10 items-center bg-base-200 p-4 max-w-fit rounded-xl mx-auto">
        <div className="p-4 bg-[#c5414e24] rounded-xl">
          <FaDonate  className="text-5xl text-[#9B111E] " />
        </div>
        <div>
          <SectionTitle subHeading={"Total Funding"} Heading={'$5486'} />
        </div>
      </div>

      <div className="flex gap-10 items-center bg-base-200 p-4 max-w-fit rounded-xl mx-auto">
        <div className="p-4 bg-[#c5414e24] rounded-xl">
          <BiSolidDonateBlood className="text-5xl text-[#9B111E] " />
        </div>
        <div>
          <SectionTitle subHeading={"Total Blood Donation"} Heading={donationRequests?.length} />
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboardHome;
