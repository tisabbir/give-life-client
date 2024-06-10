import { useLoaderData } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const UpdateRequest = () => {
  const request = useLoaderData();
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();

  const {
    recipientName,
    recipientDistrict,
    recipientUpozila,
    hospital,
    address,
    requestMessage,
  } = request;
  const handleSubmit = () => {
    //codes here
  };
  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content">
          <div className="card shrink-0 w-full flex-1 shadow-2xl bg-base-100">
            <h1 className="text-center mt-4 text-2xl font-bold">
              Update Donation Request
            </h1>
            <form
              onSubmit={handleSubmit}
              className="card-body grid grid-cols-1 md:grid-cols-2 justify-center items-center"
            >
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
                  defaultValue={recipientName}
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <input
                  type="text"
                 defaultValue={recipientDistrict}
                  name="district"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upozila</span>
                </label>
                <input
                  type="text"
                 defaultValue={recipientUpozila}
                  name="upozila"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hospital Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={hospital}
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
                 defaultValue={address}
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
                  defaultValue={requestMessage}
                  name="message"
                  className="textarea textarea-bordered"
                />
              </div>

              <div className="form-control mt-6 md:col-span-2">
                <button className="btn bg-[#9B111E] text-white mt-3">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRequest;
