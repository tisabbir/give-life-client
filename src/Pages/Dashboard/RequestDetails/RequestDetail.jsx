import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import donationRequestBanner from "../../../assets/donationRequest.jpg";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const RequestDetail = () => {
  const request = useLoaderData();
  const {user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    requesterName,
    requesterEmail,
    recipientName,
    recipientDistrict,
    recipientUpozila,
    hospital,
    address,
    donationDateAndTime,
    requestMessage,
    donationStatus,
  } = request;

  const updatedRequest = {
    donationStatus : "inprogress"
  }


  const handleDonate = () => {
    Swal.fire({
        title: "Are you sure to donate?",
        text: `Donor Name : ${user.displayName} || 
                Donor Email : ${user.email}
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "I'll Donate, InshaAllah!"
      }).then((result) => {
        if (result.isConfirmed) {

            axiosSecure.patch(`/requests/${_id}`, updatedRequest)
            .then(res => {
                console.log(res.data);
                if(res.data.modifiedCount > 0){
                    Swal.fire({
                        title: "Your Donation Confirmed!",
                        text: "We will be waiting for your donation.",
                        icon: "success"
                      });
                }
            })


          
        }
      });
  }
  return (
    <div>
      <SectionTitle
        Heading={"Blood Donation Request Details"}
        subHeading={requesterName + "'s"}
      />

      <div className="card card-compact w-3/4 mx-auto bg-base-100 shadow-md my-12">
        <figure>
          <img
            className="w-96 rounded-lg"
            src={donationRequestBanner}
            alt={"Donation Request Banner"}
          />
        </figure>
        <div className="w-full p-6 space-y-1 mb-6">
          <div className=" w-full  flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              {new Date(donationDateAndTime).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <button className="btn btn-sm bg-[#9B111E] text-white">
              {" "}
              {donationStatus}{" "}
            </button>
          </div>

          <h1 className="text-2xl font-bold">{recipientName}</h1>
              
          <p className="text-gray-500 text-sm">
            Address :{" "}
            {hospital +
              ", " +
              address +
              ", " +
              recipientUpozila +
              ", " +
              recipientDistrict}
          </p>

          <p>{requestMessage}</p>
          <p className="text-gray-500 text-sm pb-4">Requester : {requesterName} | {requesterEmail} </p>
            {
                donationStatus === 'done' || donationStatus === 'canceled' ? 
                <button onClick={handleDonate} disabled className="btn bg-[#9B111E] text-white text-xl px-12">Donate</button>
                : 
                <button onClick={handleDonate} className="btn bg-[#9B111E] text-white text-xl px-12">Donate</button>
            }
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
