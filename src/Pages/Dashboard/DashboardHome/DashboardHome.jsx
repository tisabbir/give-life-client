
import { FaAddressBook, FaPenToSquare, FaTrash } from "react-icons/fa6";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashboardHome = () => {
  const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const {data : donationRequests} = useQuery({
        queryKey: ['requests', user.email],
        queryFn: async () => {
            const res = await  axiosSecure.get(`/donationRequests/${user.email}`);
            return res.data;
        }
    })



  return (
    <div>
      <SectionTitle
        Heading={"Welcome To Your Dashboard"}
        subHeading={user.displayName}
      />

        {
            donationRequests ?  <div className="mt-12">
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Recipient Name</th>
                    <th>Recipient Location</th>
                    <th>Donation Date & Time</th>
                    <th>Donation Status</th>
                    <th>Donor Information</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
    
                    {
                        donationRequests.map((item, index)=>
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{item.recipientName}</td>
                          <td>{item.recipientUpozila} , {item.recipientDistrict}</td>
                          <td>{new Date(item.donationDateAndTime).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          })}</td>
                          <td>{item.donationStatus}</td>
                          <td>{user.displayName}, {user.email} </td>
                          <td> <FaPenToSquare className="text-center text-xl hover:text-[#9B111E]" /> </td>
                          <td><FaTrash  className="text-center text-xl text-[#9B111E] hover:text-black" /></td>
                          <td><FaAddressBook className="text-center text-xl hover:text-[#9B111E]" /> </td>
                        </tr>)
                    }
                  
                </tbody>
               
              </table>
            </div>
          </div> 
          : 
          <></>
        }

    </div>
  );
};

export default DashboardHome;
