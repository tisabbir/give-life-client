import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import React from 'react';

const DonationRequestsSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: pendingDonationRequests } = useQuery({
    queryKey: ["pendingDonationRequests"],
    queryFn: async () => {
      const result = await axiosPublic.get("/pendingDonationRequests");
      return result.data;
    },
  });

  console.log(pendingDonationRequests);

  return (
    <div>
      <SectionTitle
        Heading={"Donation Requests"}
        subHeading={"Save Life by donating blood"}
      />

      <div>
        {
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                alt="Album"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">New album is released!</h2>
              <p>Click the button to listen on Spotiwhy app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Listen</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default DonationRequestsSection;
