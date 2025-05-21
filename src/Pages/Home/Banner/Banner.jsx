import { Link } from "react-router-dom";
import PrimaryBtn from "../../../Components/PrimaryButton/PrimaryBtn";
import SecondaryBtn from "../../../Components/SecondaryButton/SecondaryBtn";
import banner from "../../../assets/banner.png";

import React from 'react';

const Banner = () => {
  return (
    <div className="pt-24">
      <div
        className="hero h-96 bg-fixed"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Give Life, Save Lives</h1>
            <p className="mb-5">
              Every blood donation can save up to three lives. Be a hero
              today—register as a donor, volunteer your time, or support our
              cause. Together, we can ensure a healthier tomorrow for everyone.
            </p>
          <div className="flex gap-4 flex-col md:flex-row justify-center items-center">
         <Link to={'/register'}> <PrimaryBtn btnText={'Join As A Donor'} /></Link>
           <SecondaryBtn btnText="Search Donors" />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
