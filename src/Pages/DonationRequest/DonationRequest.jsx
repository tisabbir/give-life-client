import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa6";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import React from 'react';


const DonationRequest = () => {
    const axiosPublic = useAxiosPublic()
    const {data : pendingDonationRequests = [] } = useQuery({
        queryKey:['donationRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/pendingDonationRequests')
            return res.data
        }
    })

   

    return (
        <div className="pt-24">
            <SectionTitle Heading={'Available Donation Requests'} subHeading={"All Donation Requests That Are Not Yet Fulfilled"} />

            {pendingDonationRequests ? (
          <div className="mt-12">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Recipient Name</th>
                    <th>Recipient Location</th>
                    <th>Donation Date & Time</th>
                    
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingDonationRequests.map((item, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.recipientName}</td>
                      <td>
                        {item.recipientUpozila} , {item.recipientDistrict}
                      </td>
                      <td>
                        {new Date(item.donationDateAndTime).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </td>
                    
                      <td>
                        <Link to={`/dashboard/requestDetails/${item._id}`}><FaAddressBook className="text-center text-xl hover:text-[#9B111E]" /></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            
          </div>
        ) : (
          <></>
        )}
        </div>
    );
};

export default DonationRequest;