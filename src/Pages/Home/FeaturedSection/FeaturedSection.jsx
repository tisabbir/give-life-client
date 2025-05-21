import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaAward, FaHeartPulse, FaPeopleGroup, FaUserDoctor } from "react-icons/fa6";
import React from 'react';


const FeaturedSection = () => {
    return (
        <div className="mt-24  bg-white p-6">
            <SectionTitle subHeading={'Featured Section'} Heading={'How Many Impact We have So Far?'} />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center bg-base-200 rounded-md  p-6 flex flex-col gap-6 justify-center items-center">
                    <FaHeartPulse className="mx-auto text-7xl hover:text-[#9B111E]" />
                    <h1 className="text-5xl text-[#9B111E]">2903</h1>
                    <h2 className="text-3xl font-extralight">Success Smiles</h2>
                </div>
                <div className="text-center bg-base-200 rounded-md p-6 flex flex-col gap-6 justify-center items-center">
                    <FaUserDoctor className="mx-auto text-7xl hover:text-[#9B111E]" />
                    <h1 className="text-5xl text-[#9B111E]">9780</h1>
                    <h2 className="text-3xl font-extralight">Donors</h2>
                </div>
                <div className="text-center bg-base-200 rounded-md p-6 flex flex-col gap-6 justify-center items-center">
                    <FaPeopleGroup className="mx-auto text-7xl hover:text-[#9B111E]" />
                    <h1 className="text-5xl text-[#9B111E]">12903</h1>
                    <h2 className="text-3xl font-extralight">Recipients</h2>
                </div>
                <div className="text-center bg-base-200 rounded-md p-6 flex flex-col gap-6 justify-center items-center">
                    <FaAward className="mx-auto text-7xl hover:text-[#9B111E]" />
                    <h1 className="text-5xl text-[#9B111E]">98</h1>
                    <h2 className="text-3xl font-extralight">Awards</h2>
                </div>
            
            </div>
        </div>
    );
};

export default FeaturedSection;