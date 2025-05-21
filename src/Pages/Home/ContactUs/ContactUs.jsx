import PrimaryBtn from "../../../Components/PrimaryButton/PrimaryBtn";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import contactUs from '../../../assets/contactUs.jpg'
import React from 'react';

const ContactUs = () => {
  return (
    <div className="mt-24 z-0">
        <SectionTitle subHeading={"Communicate With Us"} Heading={'Contact Us'} />
      <div className="hero  mt-12">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="text-center w-full lg:text-left">
            <img className="w-3/4 rounded-lg" src={contactUs} />
          </div>
          <div className="card shrink-0 w-full shadow-2xl bg-base-100">
            
            <form className="card-body ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact Number</span>
                </label>
                <p className="font-extralight">+880123456788</p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="full name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              
              <div className="form-control mt-6">
                <PrimaryBtn btnText={'Contact Us'} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
