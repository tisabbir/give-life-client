import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const [districts, setDistricts] = useState([]);
  const [upozilas, setUpozilas] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

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


  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content">
          <div className="card shrink-0 w-full flex-1 shadow-2xl bg-base-100">
            <h1 className="text-center mt-4 text-2xl font-bold">
              Create Donation Request
            </h1>
            <form className="card-body grid grid-cols-1 md:grid-cols-2 justify-center items-center">
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
                  name="fullAddress"
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
                <button className="btn bg-[#9B111E] text-white mt-3">
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
