import React from 'react';


const PrimaryBtn = ({btnText}) => {
    return (
        <div>
            <button className="btn text-xl bg-[#9B111E] text-white border-none">{btnText}</button>
        </div>
    );
};

export default PrimaryBtn;