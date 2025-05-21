import { FaAddressBook, FaPenToSquare, FaTrash } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { MdCancel } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import PrimaryBtn from "../../../../Components/PrimaryButton/PrimaryBtn";
import React from 'react';

const DonorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donationRequests = [] , refetch} = useQuery({
    queryKey: ["requests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/${user.email}`);
      return res.data;
    },
  });



//Recent 3 donation req 
const sortedDonationRequests = donationRequests.sort((a, b) => new Date(b.donationDateAndTime) - new Date(a.donationDateAndTime));

const recentThreeData = sortedDonationRequests.slice(0, 3);





  const handleStatus = (item, newStatus) => {
        const updatedItem = {
            donationStatus : newStatus,
        }
        axiosSecure.patch(`/requests/${item._id}`, updatedItem)
        .then(res => {
            if(res.data.modifiedCount>0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Donation Status Has been updated",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  
                refetch();
            }
        })
        .catch(err => {
            console.log(err);
        })
  }

  

  const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

            axiosSecure.delete(`/donationRequests/${id}`)
            .then(res => {

                if(res.data.deletedCount > 0){

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
    
                    refetch();
                }
        
            })
            .catch(err => {
                console.log(err);
            })


         

        }
      });
  }

  return (
    <div>
      

      {donationRequests ? (
        <div className="mt-12">
          <div className="overflow-x-auto">
            <table className="table">
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
                {recentThreeData.map((item, index) => (
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
                    <td className="flex items-center gap-2">
                      {item.donationStatus}
                      {item.donationStatus === "inprogress" ? (
                        <div className="flex justify-center items-center gap-2">
                          <MdCancel onClick={()=>handleStatus(item, 'canceled')} className="text-center text-xl text-[#9B111E] hover:text-black " />{" "}
                          <IoCheckmarkDoneCircle onClick={()=>handleStatus(item, 'done')} className="text-center text-xl hover:text-[#9B111E]" />
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      {item.donationStatus === "inprogress" ? (
                        <>{user.displayName + ", " + user.email}</>
                      ) : (
                        <></>
                      )}{" "}
                    </td>
                    <td>
                      <Link to={`/dashboard/updateRequest/${item._id}`}><FaPenToSquare className="text-center text-xl hover:text-[#9B111E]" /></Link>
                    </td>
                    <td>
                      <FaTrash onClick={()=>handleDelete(item._id)} className="text-center text-xl text-[#9B111E] hover:text-black" />
                    </td>
                    <td>
                      <Link to={`/dashboard/requestDetails/${item._id}`}><FaAddressBook className="text-center text-xl hover:text-[#9B111E]" /></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            to={"/dashboard/my-donation-requests"}
            className="w-full flex justify-center mt-12"
          >
            {" "}
            <PrimaryBtn className="" btnText={"View my all request"} />
          </Link>
        </div>
      ) : (
       <></>
      )}
    </div>
  );
};

export default DonorDashboard;
