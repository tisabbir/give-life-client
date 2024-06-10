import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import donationRequestBanner from "../../../assets/donationRequest.jpg";

const RequestDetail = () => {
  const request = useLoaderData();
  const {
    requesterName,
    recipientName,
    recipientDistrict,
    recipientUpozila,
    hospital,
    address,
    donationDateAndTime,
    requestMessage,
    donationStatus,
  } = request;
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
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
