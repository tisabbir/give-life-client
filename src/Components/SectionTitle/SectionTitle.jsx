

const SectionTitle = ({Heading, subHeading}) => {
    return (
        <div>
            <h3 className="text-[#9B111E] text-center">{subHeading}</h3>
            <h1 className="text-center font-bold text-3xl">{Heading}</h1>
        </div>
    );
};

export default SectionTitle;