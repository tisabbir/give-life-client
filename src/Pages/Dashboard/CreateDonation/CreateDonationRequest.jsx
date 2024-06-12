import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const { data: userInfo = {} } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const [districts, setDistricts] = useState([]);
  const [upozilas, setUpozilas] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetch("../../../../public/districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data[2].data);
      });
  }, []);

  useEffect(() => {
    fetch("../../../../public/upozillas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpozilas(data[2].data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const requesterName = user.displayName;
    const requesterEmail = user.email;
    const recipientName = form.name.value;
    const recipientDistrict = form.district.value;
    const recipientUpozila = form.upozila.value;
    const hospital = form.hospital.value;
    const address = form.address.value;
    const donationDateAndTime = startDate;
    const requestMessage = form.message.value;
    const donationStatus = 'pending';

    const donationRequest = {
        requesterName,
        requesterEmail,
        recipientName,
        recipientDistrict,
        recipientUpozila,
        hospital,
        address,
        donationDateAndTime,
        requestMessage,
        donationStatus
    }

   

    axiosSecure.post('/donationRequests', donationRequest)
    .then(res => {


        if(res.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your donation request has been added",
                showConfirmButton: false,
                timer: 1500
              });
        }
        
    })
    .catch(err => {
        console.log(err);
    })

  }


  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content">
          <div className="card shrink-0 w-full flex-1 shadow-2xl bg-base-100">
            <h1 className="text-center mt-4 text-2xl font-bold">
              Create Donation Request
            </h1>
            <form onSubmit={handleSubmit} className="card-body grid grid-cols-1 md:grid-cols-2 justify-center items-center">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Requester Name</span>
                </label>
                <input
                  type="text"
                  placeholder={user.displayName}
                  className="input input-bordered"
                  disabled
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Requester Email</span>
                </label>
                <input
                  type="email"
                  placeholder={user.email}
                  className="input input-bordered"
                  disabled
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipient Name</span>
                </label>
                <input
                  type="text"
                  placeholder={"Name"}
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select
                  defaultValue={"Choose your district"}
                  name="district"
                  className="select select-bordered w-full max-w-xs"
                >
                  <option disabled>Choose your district</option>

                  {districts.map((district) => (
                    <option key={district.id}>{district.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upozila</span>
                </label>
                <select
                  defaultValue={"Choose your upozila"}
                  name="upozila"
                  className="select select-bordered w-full max-w-xs"
                >
                  <option disabled>Choose your Upozila</option>

                  {upozilas.map((upozila) => (
                    <option key={upozila.id}>{upozila.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hospital Name</span>
                </label>
                <input
                  type="text"
                  placeholder={"hospital name"}
                  name="hospital"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Address"
                  name="address"
                  className="input input-bordered"
                />
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donation Date & Time</span>
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Request Message</span>
                </label>
                <textarea
                  type="text"
                  placeholder="message"
                  name="message"
                  className="textarea textarea-bordered"
                />
              </div>
              

              <div className="form-control mt-6 md:col-span-2">
                {userInfo?.status === 'blocked' ? <></> : <button className="btn bg-[#9B111E] text-white mt-3">
                  Request
                </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
